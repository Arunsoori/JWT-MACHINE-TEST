const mongoose = require('mongoose')
const { schema } = require('./UserModel')

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    task: {
        type: String,
        requried: true
    }
}, { timestamps: true })

module.exports = new mongoose.model('todo', todoSchema)