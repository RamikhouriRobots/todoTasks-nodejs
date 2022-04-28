const mongoose = require('mongoose');

const template = new mongoose.Schema({
    templateId: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    title: {
        type: String,
    }

})

module.exports = mongoose.model('Template', template);