const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
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
		enum: ['admin', 'user', 'guest'],
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

const Users = model('Users', usersSchema);

module.exports = { Users };
