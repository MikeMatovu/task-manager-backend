const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [100, 'Description cannot be more than 100 characters'],
    },
    reminderDate: {
        type: Date,
        required: [true, 'Please provide a reminder date'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['work', 'personal', 'others'],
        default: 'personal',
    },
    priority : {
        type: String,
        required: [true, 'Please provide a priority'],
        enum: ['high', 'medium', 'low'],
        default: 'low',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    
    });

const Task = mongoose.model('task', TaskSchema);

module.exports = {Task};
