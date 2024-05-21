const mongoose = require('mongoose');
const { Schema } = mongoose;

const artpostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // this is to store the user --> ID --> JWT
    },
    filename: { 
        type: String, 
        required: true 
    },
    contentType: { 
        type: String, 
        required: true 
    },
    tag: { 
        type: String, 
        default: 'General' 
    },
    imageBase64: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('artpost', artpostSchema);
