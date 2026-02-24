import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js'
import taskRoutes from './routes/tasks.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));