import User from '../models/User.js'
import Note from '../models/Notes.js'
import Task from '../models/Tasks.js'
import bcrypt from 'bcryptjs'

export const getUserInfo = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findOne({ _id: id })
        const { email, displayName } = user
        res.status(200).json({ email: email, displayName: displayName })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const id = req.user.id
        const { email, displayName, password } = req.body

        const user = await User.findOne({ _id: id })
        if (!user) res.status(400).json({ message: 'User not found' })

        user.email = email
        user.displayName = displayName

        if (password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }

        const savedUser = await user.save()
        const { newEmail, newDisplayName } = savedUser

        res.status(200).json({ newEmail: newEmail, newDisplayName: newDisplayName })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const getUserItems = async (req, res) => {
    try {
        const id = req.user.id

        const notes = await Note.countDocuments({ user: id })
        const tasks = await Task.countDocuments({ user: id })
        const pendingTasks = await Task.countDocuments({ user: id, status: 'Incomplete' })

        res.status(200).json({ notes: notes, tasks: tasks, pendingTasks: pendingTasks })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}