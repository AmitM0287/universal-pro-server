const crypto = require('crypto');
const { z: zod } = require('zod');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const validateSignupPayload = (payload) => {
	const schema = zod.object({
		firstName: zod.string(),
		lastName: zod.string(),
		email: zod.string().email(),
		password: zod.string().min(8),
		phoneNo: zod.number().optional()
	});
	return schema.safeParse(payload);
};

const validateSigninPayload = (payload) => {
	const schema = zod.object({
		email: zod.string().email(),
		password: zod.string().min(8).max(25)
	});
	return schema.safeParse(payload);
};

const validateTokenPayload = (payload) => {
	const schema = zod.object({
		_id: zod.string(),
		role: zod.string()
	});
	return schema.safeParse(payload);
};

const generateHash = (password, salt=uuidv4()) => {
	const hash = crypto.createHmac('sha256', salt)
		.update(password)
		.digest('hex');
	return { hash, salt };
};

const generateToken = (payload) => {
	const safeParseResult = validateTokenPayload(payload);
	if (safeParseResult.error) throw new Error(safeParseResult.error);
	const token = jwt.sign(safeParseResult.data, process.env.JWT_SECRET);
	return token;
};

const validateToken = (token) => {
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const safeParseResult = validateTokenPayload(payload);
		if (safeParseResult.error) throw new Error(safeParseResult.error);
		return safeParseResult.data;
	} catch (err) {
		return null;
	}
};

module.exports = { validateSignupPayload, validateSigninPayload, validateTokenPayload, generateHash, generateToken, validateToken };
