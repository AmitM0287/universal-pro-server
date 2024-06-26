const crypto = require('crypto');
const { z: zod } = require('zod');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const validateUserRegisterPayload = (payload) => {
	const schema = zod.object({
		firstName: zod.string(),
		lastName: zod.string(),
		email: zod.string().email(),
		password: zod.string().min(8),
		phoneNo: zod.number().optional()
	});
	return schema.safeParse(payload);
};

const validateUserLoginPayload = (payload) => {
	const schema = zod.object({
		email: zod.string().email(),
		password: zod.string().min(8)
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

const generateUserToken = (payload) => {
	const safeParseResult = validateTokenPayload(payload);
	if (safeParseResult.error) throw new Error(safeParseResult.error);
	const token = jwt.sign(safeParseResult.data, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: process.env.TOKEN_LIFETIME });
	return token;
};

const validateUserToken = (token) => {
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const safeParseResult = validateTokenPayload(payload);
		if (safeParseResult.error) throw new Error(safeParseResult.error);
		return safeParseResult.data;
	} catch (err) {
		return null;
	}
};

module.exports = { validateUserRegisterPayload, validateUserLoginPayload, validateTokenPayload, generateHash, generateUserToken, validateUserToken };
