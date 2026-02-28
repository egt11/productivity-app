import express from 'express';
import { register, login, verifyUser, checkEmail, verifyCode, resetPassword, validateUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate-user', verifyToken, validateUser)
router.get('/verify/:token', verifyUser)
router.patch('/forgot-password', checkEmail)
router.post('/check-code', verifyCode)
router.patch('/reset-password', resetPassword)

export default router;