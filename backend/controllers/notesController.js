import Note from '../models/Notes.js'

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title || !content) return res.status(400).json({ message: 'All fields required' })
        const date = new Date().toLocaleDateString()
        const newNote = await Note.create({
            title: title,
            content: content,
            date: date,
            user: req.user.id
        })
        res.status(201).json(newNote);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const editNote = async (req, res) => {
    try {
        const id = req.params.id
        const { title, content } = req.body
        if (!title || !content) return res.status(400).json({ message: 'All fields required' })
        const date = new Date().toLocaleDateString()
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { title: title, content: content, date: date },
            { returnDocument: 'after', runValidators: true }
        )
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' })

        res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id
        const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user.id })

        if (!deletedNote) return res.status(404).json({ message: 'Note not found' })
        res.status(200).json({ message: `Note deleted` });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}