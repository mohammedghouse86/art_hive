const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/upload', require('./Routes/upload_pics'));
app.use('/api/chat', require('./Routes/messages'));

app.listen(port, () => {
    console.log(`ArtHive back end listening at http://localhost:${port}`);
});
