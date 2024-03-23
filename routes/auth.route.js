const express = require('express');
const router = express.Router();
const { handleSignup, handleSignin } = require('../controllers/auth.controller');

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);

module.exports = router;
