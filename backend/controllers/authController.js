import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto'
import { sendVerificationEmail, resetPasswordEmail } from '../utils/mailer.js';

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

    try {
        const user = await User.findOne({ verificationToken: token })
        if (!user) return res.status(400).json({ message: 'Invalid/Expired token' })

        user.isVerified = true
        user.verificationToken = undefined

        await user.save()
        res.status(200).json({ message: 'Email verified successfully!' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const checkEmail = async (req, res) => {
    const { email } = req.body

    try {
        const code = crypto.randomInt(100000, 1000000).toString()

        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { resetPasswordCode: code } })
        if (!user) return res.status(400).json({ message: 'Email does not exist' })

        resetPasswordEmail(email, code)
        res.status(200).json({ message: `Please check your email and enter the code below` })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const verifyCode = async (req, res) => {
    const { email, code } = req.body

    try {
        const user = await User.findOne({ email })

        if (user.resetPasswordAttempt > 4) {
            await User.findOneAndUpdate(
                { email: email },
                {
                    $unset: { resetPasswordCode: 1 },
                    $set: { resetPasswordAttempt: 0 }
                }
            )
            return res.status(400).json({ message: 'Your code has expired.', expired: true });
        }

        if (user.resetPasswordCode !== code) {
            await User.findOneAndUpdate(
                { email: email },
                { $inc: { resetPasswordAttempt: 1 } }
            )
            return res.status(400).json({ message: 'Wrong code. Try again.' });
        }

        await User.findOneAndUpdate(
            { email: email },
            {
                $unset: { resetPasswordCode: 1 },
                $set: { resetPasswordAttempt: 0 }
            }
        )

        res.status(200).json({ message: `Code matched!` })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const resetPassword = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ message: 'User not found' })

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword

        await user.save()
        res.status(200).json({ message: `User password updated!` })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const validateUser = async (req, res) => {
    const id = req.user.id

    try {
        const user = await User.findOne({ _id: id })
        if (!user) return res.status(400).json({ message: 'User not found' })

        res.status(200).json({ isLoggedIn: true })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}