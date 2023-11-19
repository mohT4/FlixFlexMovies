const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

router.post('/forgertpasswor', authController.forgetPassword);
router.post('/resetpassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.updatePassword);

module.exports = router;
