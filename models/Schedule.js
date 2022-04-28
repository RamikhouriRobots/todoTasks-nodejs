const mongoose = require('mongoose');

const schedule = new mongoose.Schema({
    notificationId: {
        type: String,
        required: true
    },
    scheduleId: {
        type: String,
        required: true
    },
    alert: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    templateId: {
        type: String
    }

})

module.exports = mongoose.model('Schedule', schedule);