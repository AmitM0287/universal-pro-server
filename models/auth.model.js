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
	phoneNo: {
		type: Number
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

const User = model('authUser', userSchema);

module.exports = { User };