const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      date_of_birth: {
            type: Date,
            required: true
      },
      date: {
            type: Date,
            default: Date.now
      },
      imageBase64: {
            type: String,
            required: true
        },
});
const User = mongoose.model('user', UserSchema)
//User.createIndexes(); I dont need extra index I already have one
module.exports = mongoose.model('user', UserSchema);