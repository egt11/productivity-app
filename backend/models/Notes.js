import mongoose, { mongo } from "mongoose";

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const Note = mongoose.model('Note', noteSchema)
export default Note