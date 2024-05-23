const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is to store the user --> ID --> JWT
    },
    artpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artpost' // this is to store the user --> ID --> JWT
    },
    bid: { 
        type: Number,  
    },
    date: {
          type: Date,
          default: Date.now
    }
});

module.exports = mongoose.model('bid', bidSchema);
