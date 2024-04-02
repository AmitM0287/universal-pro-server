const { Schema, model } = require('mongoose');

const configurationSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	properties: {
		type: Object,
		required: true,
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

const Configuration = model('Configurations', configurationSchema);

module.exports = { Configuration };
