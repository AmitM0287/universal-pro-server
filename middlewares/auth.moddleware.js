const { validateUserToken } = require('../lib/auth.lib');

const authenticationMiddleware = () => (req, res, next) => {
	const authHeader = req.headers['Authorization'] ?? req.headers['authorization'];
	if (authHeader) {
		const headerSplit = authHeader.split('Bearer ');
		if (headerSplit.length === 2) {
			const token = headerSplit[1];
			const validateTokenResult = validateUserToken(token);
			if (validateTokenResult) {
				req.user = validateTokenResult;
			}
		}
	}
	next();
};

const ensureAuthenticated = (allowedRoles = null) => (req, res, next) => {
	const user = req.user;
	if (!user) {
		return res.status(401).json({
			status: 'error',
			message: 'Unauthenticated',
			error: []
		});
	}
	if (!allowedRoles) return next();
	if (!allowedRoles.includes(user.role)) 
		return res.status(401).json({
			status: 'error',
			message: 'Access denied',
			error: []
		});
	next();
};

module.exports = { authenticationMiddleware, ensureAuthenticated };
