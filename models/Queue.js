const mongoose = require('mongoose');

const queue = new mongoose.Schema({
    scheduleId: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Queue', queue);