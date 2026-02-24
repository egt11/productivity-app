import Task from "../models/Tasks.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const addTask = async (req, res) => {
    try {
        const { title, priorityLevel, date } = req.body
        const status = 'Incomplete'
        if (!title || !priorityLevel || !date) return res.status(400).json({ message: 'All fields required' })

        const newTask = await Task.create({
            title: title,
            priorityLevel: priorityLevel,
            date: date,
            status: status,
            user: req.user.id
        })

        res.status(200).json(newTask)
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const editTask = async (req, res) => {
    try {
        const id = req.params.id
        const { title, priorityLevel, date } = req.body

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { title: title, priorityLevel: priorityLevel, date: date },
            { returnDocument: 'after', runValidators: true }
        )

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' })
        res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id })

        if (!deletedTask) return res.status(404).json({ message: 'Task not found' })
        res.status(200).json({ message: `Task deleted` });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const toggleTask = async (req, res) => {
    try {
        const id = req.params.id
        const selectedTask = await Task.findOne({ _id: id, user: req.user.id })

        const newStatus = selectedTask.status === 'Incomplete' ? 'Complete' : 'Incomplete'

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { status: newStatus },
            { returnDocument: 'after', runValidators: true }
        )

        res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}











