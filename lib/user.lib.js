const { z: zod } = require('zod');

const validateExpensePayload = (payload) => {
	const modifiedPayload = {
		...payload,
		expenseDate: new Date(payload.expenseDate)
	};
	const schema = zod.object({
		expenseDate: zod.date(),
		items: zod.array(
			zod.object({
				name: zod.string(),
				categoryName: zod.string(),
				totalCost: zod.number(),
				source: zod.string(),
				quantity: zod.number()
			})
		)
	});
	return schema.safeParse(modifiedPayload);
};

module.exports = { validateExpensePayload };
