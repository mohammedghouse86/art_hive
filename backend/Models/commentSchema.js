const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is to store the user --> ID --> JWT
    },
    artpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artpost' // this is to store the user --> ID --> JWT
    },
    comment: { 
        type: String,  
    }
});

module.exports = mongoose.model('comment', commentSchema);
