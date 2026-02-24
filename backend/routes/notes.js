import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import { getNotes, addNote, editNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', verifyToken, getNotes)
router.post('/', verifyToken, addNote)
router.put('/:id', verifyToken, editNote)
router.delete('/:id', verifyToken, deleteNote)

export default router