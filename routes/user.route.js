const express = require('express');
const router = express.Router();
const { storeUserExpenses } = require('../controllers/userExpense.controller');

router.post('/storeExpenses', storeUserExpenses);

module.exports = router;
