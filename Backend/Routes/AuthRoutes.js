const express = require('express');
const { login, sendCode, verifyCode, resetPassword } = require('../Controllers/AuthController.js');

const router = express.Router();

router.post('/login', login);
router.post('/send-code', sendCode);        
router.post('/verify-code', verifyCode);    
router.post('/reset-password', resetPassword); 

module.exports = router;