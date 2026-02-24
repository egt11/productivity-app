import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({ message: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            fullName: fullName
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, email: newUser.email, fullName: newUser.fullName, isLoggedIn: false });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

        const storedUser = await User.findOne({ email });
        if (!storedUser) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, storedUser.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, email: storedUser.email, fullName: storedUser.fullName, isLoggedIn: true });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

