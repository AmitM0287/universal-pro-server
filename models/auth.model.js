const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	salt: {
		type: String,
		required: true
	}
}, { timestamps: true });

const User = model('users', userSchema);

module.exports = { User };
