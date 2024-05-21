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
    body('tag', 'Enter a tag').isLength({ min: 3 }),
    body('bid_amount', 'Enter a bid_amount').isNumeric(),

], async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const imageBase64 = buffer.toString('base64');
        const { filename, contentType, tag, bid_amount,username } = req.body;
        const user = req.user.is; // Correctly assign user from req.user
        const username1 = req.user.name; // Correctly assign user from req.user
        console.log(user,username1)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const new_artpost = new artpost({
            user:user,
            username:username,
            filename: filename,
            contentType: contentType,
            tag:tag,
            imageBase64:imageBase64,
            bid_amount:bid_amount,
            likes:0
        });

        const saved_new_artpost = await new_artpost.save();
        res.json(saved_new_artpost);
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

// 3. Route to add comment to a post
router.post('/file_addComment/:id', getUser, async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await artpost.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const {commentorname,hiscomment } = req.body;
        const saved_new_artpost = {comments:{commentorname:null,hiscomment:null}};
        {saved_new_artpost.comments.commentorname = commentorname};            
        {saved_new_artpost.comments.hiscomment = hiscomment};      


        // find the note to be updated and update it
        let new_artpost = await artpost.findByIdAndUpdate(req.params.id, {$set:saved_new_artpost}, {new:true})
        res.json({new_artpost});


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 4. Route to add like to a post
router.post('/file_addlike/:id', getUser, async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await artpost.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const likes = 1;
        console.log(file);
        const saved_new_artpost = {likes:likes+file.likes}; 


        // find the note to be updated and update it
        let new_artpost = await artpost.findByIdAndUpdate(req.params.id, {$set:saved_new_artpost}, {new:true})
        res.json({new_artpost});


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
