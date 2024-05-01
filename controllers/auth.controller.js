const { validateUserLoginPayload, validateUserRegisterPayload, generateHash, generateUserToken } = require('../lib/auth.lib');
const { Users } = require('../models/auth.model');

const handleUserLogin = async (req, res) => {
	const safeParseResult = validateUserLoginPayload(req.body);
	if (safeParseResult.error) {
		return res.status(400).json({
			status: 'error',
			message: 'User login payload validation failed!',
			error: safeParseResult.error
		});
	}
	const { email, password } = safeParseResult.data;
	const userInDb = await Users.findOne({ email });
	if (!userInDb) {
		return res.status(404).json({
			status: 'error',
			message: `User with email ${email} doesn't exists!`,
			error: []
		});
	}
	const { hash } = generateHash(password, userInDb.salt);
	if (hash !== userInDb.password) {
		return res.status(400).json({
			status: 'error',
			message: 'Incorrect user email or password!',
			error: []
		});
	}
	const token = generateUserToken({ _id: userInDb._id.toString(), role: userInDb.role });
	return res.status(200).json({
		status: 'success',
		message: 'User authenticated successfully!',
		data: {
			token: token
		}
	});
};

const handleUserRegister = async (req, res) => {
	const safeParseResult = validateUserRegisterPayload(req.body);
	if (safeParseResult.error) {
		return res.status(400).json({
			status: 'error',
			message: 'User register payload validation failed!',
			error: safeParseResult.error
		});
	}
	const { firstName, lastName, email, password } = safeParseResult.data;
	try {
		const { hash: hashedPassword, salt } = generateHash(password);
		const createUserResult = await Users.create({ firstName, lastName, email, password: hashedPassword, salt });
		const token = generateUserToken({ _id: createUserResult._id.toString(), role: createUserResult.role });
		return res.status(201).json({ 
			status: 'success', 
			message: 'User created successfully!', 
			data: { 
				_id: createUserResult._id,
				token: token
			} 
		});
	} catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({ 
				status: 'error',
				message: `User with email ${email} already exists!` ,
				error: []
			});
		}
		console.log(`[handleUserRegister] ${err}`);
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error!',
			error: []
		});
	}
};

const handleGetUserProfile = async (req, res) => {
	const user = req.user;
	if (!user) {
		res.status(400).json({
			status: 'error',
			message: 'User doesn\'t not exists!',
			error: []
		});
	}
	const userInDb = await Users.findById(user._id);
	return res.status(200).json({
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

module.exports = { handleUserLogin, handleUserRegister, handleGetUserProfile };
