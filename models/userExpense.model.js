const { Schema, model } = require('mongoose');

const userExpenseSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	expenseDate: {
		type: Date,
		required: true
	},
	items: [{
		name: { type: String, required: true },
		categoryName: { type: String, required: true },
		totalCost: { type: Number, required: true },
		source: { type: String, required: true },
		quantity: { type: Number, required: true }
	}],
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

const UserExpense = model('UserExpenses', userExpenseSchema);

module.exports = { UserExpense };
