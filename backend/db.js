const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/ArtHive';

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToMongo;
