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
	phoneNo: {
		type: Number
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	salt: {
		type: String,
		required: true
	},
	activeFlag: {
		type: Boolean,
		enum: [true, true],
		default: true
	},
	deleteFlag: {
		type: Boolean,
		enum: [true, false],
		default: false
	}
}, { timestamps: true } );

const User = model('Users', userSchema);

module.exports = { User };
