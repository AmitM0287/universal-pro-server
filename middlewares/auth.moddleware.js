const { validateToken } = require('../lib/auth.lib');

const authenticationMiddleware = () => (req, res, next) => {
	const authHeader = req.headers['Authorization'] ?? req.headers['authorization'];
	if (authHeader) {
		const headerSplit = authHeader.split('Bearer ');
		if (headerSplit.length === 2) {
			const token = headerSplit[1];
			const validateTokenResult = validateToken(token);
			if (validateTokenResult)
				req.user = validateTokenResult;
		}
	}
	next();
};

const ensureAuthenticated = (allowedRoles = null) => (req, res, next) => {
	const user = req.user;
	if (!user)
		return res.status(401).json({
			status: 'error',
			error: 'Unauthenticated'
		});
	if (!allowedRoles) return next();
	if (!allowedRoles.includes(user.role)) 
		return res.json({
			status: 'error',
			error: 'Access denied'
		});
	next();
};

module.exports = { authenticationMiddleware, ensureAuthenticated };
