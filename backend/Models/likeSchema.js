const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is to store the user --> ID --> JWT
    },
    artpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artpost' // this is to store the user --> ID --> JWT
    },
    like: { 
        type: Boolean,  
    }
});

module.exports = mongoose.model('like', likeSchema);
