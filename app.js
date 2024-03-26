const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { authenticationMiddleware } = require('./middlewares/auth.moddleware');
const authRoutes = require('./routes/auth.route');

/* Dotenv */
require('dotenv').config();

/* App server */
const app = express();
const server = http.createServer(app);

/* Mongoose connection */
mongoose.connect(process.env.MONGO_DB_URI)
	.then(() => console.log('> MongoDB Connected ...'))
	.catch((err) => console.log(`Error occured while connecting to Mongo DB. ${err}`));

/* Middlewares */
app.use(cors({
	origin: process.env.ALLOWED_ORIGINS,
	methods: process.env.ALLOWED_METHODS,
	allowedHeaders: process.env.ALLOWED_HEADERS
}));
app.use((req, res, next) => {
	res.setHeader('X-Coded-By', process.env.X_CODED_BY);
	res.setHeader('Content-Security-Policy', process.env.CONTENT_SECURITY_POLICY);
	res.removeHeader('X-Powered-By'); 
	next();
});
app.use(express.json());
app.use(express.static(path.resolve('./public')));
app.use(authenticationMiddleware());

/* Routes */
app.use('/api/v1/auth', authRoutes);

server.listen(process.env.PORT, () => 
	console.log(`> Server is running on port ${process.env.PORT} ...`)
);
