import express from 'express';
import { register, login, verifyUser, checkEmail, verifyCode, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyUser)
router.patch('/forgot-password', checkEmail)
router.patch('/check-code', verifyCode)
router.patch('/reset-password', resetPassword)

export default router;