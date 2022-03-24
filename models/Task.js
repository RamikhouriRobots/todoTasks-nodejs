const mongoose = require('mongoose');

function getUUID() {
    var d = new Date().getTime();
    var newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );

    return newGuid;
  };

const taskSchema = new mongoose.Schema({
    taskId:{
        type: String,
        default:  getUUID()
      },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type:{
       type: String,
       required: true,
       default: 'Daily task'
    }


});

module.exports = mongoose.model('Task', taskSchema);