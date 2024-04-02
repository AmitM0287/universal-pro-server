const { validateSignupPayload, validateSigninPayload, generateHash, generateToken } = require('../lib/auth.lib');
const { User } = require('../models/user.model');

const handleUserSignup = async (req, res) => {
	const safeParseResult = validateSignupPayload(req.body);
	if (safeParseResult.error) {
		return res.status(400).json({
			status: 'error',
			error: safeParseResult.error
		});
	}
	const { firstName, lastName, email, password } = safeParseResult.data;
	try {
		const { hash: hashedPassword, salt } = generateHash(password);
		const createUserResult = await User.create({ firstName, lastName, email, password: hashedPassword, salt });
		const token = generateToken({ _id: createUserResult._id.toString(), role: createUserResult.role });
		return res.status(201).json({ 
			status: 'success', 
			message: 'User created successfully!', 
			data: { 
				_id: createUserResult._id,
				token: token
			} 
		});
	} catch (err) {
		if (err.code === 11000) 
			res.status(400).json({ message: `User with email ${email} already exists!` });
		console.log(`[handleUserSignup] ${err}`);
		res.status(500).json({
			status: 'error',
			error: 'Internal server error!'
		});
	}
};

const handleUserSignin = async (req, res) => {
	const safeParseResult = validateSigninPayload(req.body);
	if (safeParseResult.error) {
		return res.status(400).json({
			status: 'error',
			error: safeParseResult.error
		});
	}
	const { email, password } = safeParseResult.data;
	const userInDb = await User.findOne({ email });
	if (!userInDb) {
		return res.status(404).json({
			status: 'error',
			error: `User with email ${email} doesn't exists!`
		});
	}
	const { hash } = generateHash(password, userInDb.salt);
	if (hash !== userInDb.password) {
		return res.status(400).json({
			status: 'error',
			error: 'Incorrect user email or password!'
		});
	}
	const token = generateToken({ _id: userInDb._id.toString(), role: userInDb.role });
	return res.status(200).json({
		status: 'success',
		message: 'User authenticated successfully!',
		data: {
			token: token
		}
	});
};

const handleGetUserProfile = async (req, res) => {
	const user = req.user;
	if (!user) {
		res.json({
			status: 'error',
			error: 'User profile retrieved successfully!',
			data: null
		});
	}
	const userInDb = await User.findById(user._id);
	return res.json({
		status: 'success',
		message: 'User profile retrieved successfully!',
		data: {
			_id: user._id,
			firstName: userInDb.firstName,
			lastName: userInDb.lastName,
			email: userInDb.email,
			role: userInDb.role
		}
	});
};

module.exports = { handleUserSignup, handleUserSignin, handleGetUserProfile };
