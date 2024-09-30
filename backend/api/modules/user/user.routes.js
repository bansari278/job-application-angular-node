const express = require('express')
const router = express.Router();
const userController = require('../user/user.controller');
const checkAuth = require("../middleware/check-auth");

router.post('/signIn', userController.user_signUp);

router.post('/logIn',  userController.user_logIn);

module.exports = router;
