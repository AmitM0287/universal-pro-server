const express = require('express');
const router = express.Router();
const { handleUserSignup, handleUserSignin, handleGetUserProfile } = require('../controllers/auth.controller');
const { ensureAuthenticated } = require('../middlewares/auth.moddleware');

router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);
router.get('/profile', ensureAuthenticated(['user']), handleGetUserProfile);

module.exports = router;
