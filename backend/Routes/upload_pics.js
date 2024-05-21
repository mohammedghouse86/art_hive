const express = require('express');
const router = express.Router();
const artpost = require('../Models/artpost_Schema');
const { body, validationResult } = require('express-validator');
var getUser = require('../MiddleWare/getUser');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. Route to upload a post
router.post('/art', getUser, upload.single('file'), [
    body('filename', 'Enter a valid title').isLength({ min: 3 }),
    body('contentType', 'Enter a valid description').isLength({ min: 3 }),
    body('tag', 'Enter a tag').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const imageBase64 = buffer.toString('base64');
        const { filename, contentType, tag } = req.body;
        const user = req.user.id; // Correctly assign user from req.user

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new artpost({
            user,
            filename: originalname,
            contentType: mimetype,
            tag,
            imageBase64
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// 2. Route to retrieve an uploaded file
router.get('/file/:id', getUser, async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await artpost.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Send file as a response
        res.set('Content-Type', file.contentType);
        res.send(Buffer.from(file.imageBase64, 'base64'));
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
