const { UserExpense } = require('../models/userExpense.model');
const { validateExpensePayload } = require('../lib/user.lib');

const storeUserExpenses = async (req, res) => {
	const safeParseResult = validateExpensePayload(req.body);
	if (safeParseResult.error) {
		return res.status(400).json({
			status: 'error',
			error: safeParseResult.error
		});
	}
	const { expenseDate, items } = safeParseResult.data;
	try {
		const storeExpenseResult = await UserExpense.create({ userID: req.user._id, expenseDate, items });
		res.status(201).json({
			status: 'success',
			message: 'Expenses data stored successfully!', 
			data: storeExpenseResult
		});
	} catch(err) {
		console.log(`[storeUserExpenses] ${err}`);
		res.status(500).json({
			status: 'error',
			error: 'Internal server error!'
		});
	}
};

module.exports = { storeUserExpenses };
