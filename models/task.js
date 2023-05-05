const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task
