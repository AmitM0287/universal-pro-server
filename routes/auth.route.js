const express = require('express');
const router = express.Router();
const { handleUserLogin, handleUserRegister, handleGetUserProfile } = require('../controllers/auth.controller');
const { ensureAuthenticated } = require('../middlewares/auth.moddleware');

router.post('/userLogin', handleUserLogin);
router.post('/userRegister', handleUserRegister);
router.get('/getUserProfile', ensureAuthenticated(['user']), handleGetUserProfile);

module.exports = router;
