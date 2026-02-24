import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import { getTasks, addTask, editTask, deleteTask, toggleTask } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', verifyToken, getTasks)
router.post('/', verifyToken, addTask)
router.put('/:id', verifyToken, editTask)
router.patch('/:id', verifyToken, toggleTask)
router.delete('/:id', verifyToken, deleteTask)

export default router