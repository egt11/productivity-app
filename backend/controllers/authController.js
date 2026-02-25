import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto'
import { sendVerificationEmail } from '../utils/mailer.js';

dotenv.config();

export const register = async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({ message: 'All fields are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        const verificationToken = crypto.randomBytes(32).toString('hex')
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            fullName: fullName,
            verificationToken: verificationToken
        })

        sendVerificationEmail(email, verificationToken)

        res.status(200).json({ message: 'Please check your email to verify.' });
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

        if (!storedUser.isVerified) return res.status(400).json({ message: 'Verify your email first' });

        const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, email: storedUser.email, fullName: storedUser.fullName, isLoggedIn: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const verifyUser = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ verificationToken: token })
    if (!user) return res.status(400).json({ message: 'Invalid/Expired token' })

    user.isVerified = true
    user.verificationToken = undefined

    await user.save()
    res.status(200).json({ message: 'Email verified successfully!' })
}

