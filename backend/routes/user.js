import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserInfo, updateUserInfo } from "../controllers/userController.js";
import express from 'express'

const router = express.Router()

router.get('/settings', verifyToken, getUserInfo)
router.put('/settings', verifyToken, updateUserInfo)

export default router