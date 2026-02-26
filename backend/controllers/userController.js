import User from '../models/User.js'
import Note from '../models/Notes.js'
import Task from '../models/Tasks.js'
import bcrypt from 'bcryptjs'

export const getUserInfo = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findOne({ _id: id })
        const { email, fullName } = user
        res.status(200).json({ email: email, fullName: fullName })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const id = req.user.id
        const { email, fullName, password } = req.body

        const user = await User.findOne({ _id: id })
        if (!user) res.status(400).json({ message: 'User not found' })

        user.email = email
        user.fullName = fullName

        if (password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }

        const savedUser = await user.save()
        const { newEmail, newFullName } = savedUser

        res.status(200).json({ newEmail: newEmail, newFullName: newFullName })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const getUserItems = async (req, res) => {
    try {
        const id = req.user.id

        const notes = await Note.countDocuments({ user: id })
        if (!notes) return res.status(400).json({ message: 'User notes not found' })

        const tasks = await Task.countDocuments({ user: id })
        if (!tasks) return res.status(400).json({ message: 'User tasks not found' })

        const pendingTasks = await Task.countDocuments({ user: id, status: 'Incomplete' })
        if (!pendingTasks) return res.status(400).json({ message: 'User tasks not found' })

        res.status(200).json({ notes: notes, tasks: tasks, pendingTasks: pendingTasks })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}