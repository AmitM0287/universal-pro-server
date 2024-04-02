const { Schema, model } = require('mongoose');

const userIncomeSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	creditAmt: {
		type: Number,
		required: true
	},
	creditMonth: {
		type: String,
		required: true
	},
	creditYear: {
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

const UserIncome = model('UserIncomes', userIncomeSchema);

module.exports = { UserIncome };
