import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    priorityLevel: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Task = mongoose.model('Task', taskSchema)
export default Task