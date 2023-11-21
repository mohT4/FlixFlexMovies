const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//signIn and signUp routes
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

//forget password and reset Password
router.post('/forgertpasswor', authController.forgetPassword);
router.post('/resetpassword/:token', authController.resetPassword);

//updatePassword route
router.patch('/updateMyPassword', authController.updatePassword);

module.exports = router;
