const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    chatWithUser_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is to store the user --> ID --> JWT
    },
    chatWithUser_2: {
        type: String,
        required: true
  },
    message: { 
        type: String,  
    },
    date: {
          type: Date,
          default: Date.now
    }
});

module.exports = mongoose.model('chat', chatSchema);
