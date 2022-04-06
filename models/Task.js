const mongoose = require('mongoose');
const getUUID = require('../shared/helper.js')


const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        default: getUUID()
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        default: 'Daily task'
    }


});

module.exports = mongoose.model('Task', taskSchema);