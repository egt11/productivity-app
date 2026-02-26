import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserInfo, updateUserInfo, getUserItems } from "../controllers/userController.js";
import express from 'express'

const router = express.Router()

router.get('/settings', verifyToken, getUserInfo)
router.put('/settings', verifyToken, updateUserInfo)
router.get('/dashboard', verifyToken, getUserItems)

export default router