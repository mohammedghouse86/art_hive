const express = require('express');
const router = express.Router();
const artpost = require('../Models/artpost_Schema');
const { body, validationResult } = require('express-validator');
var getUser = require('../MiddleWare/GetUser');
const multer = require('multer');
const commentSchema = require('../Models/commentSchema');
const likeSchema = require('../Models/likeSchema');
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
        const { filename, contentType, tag, bid_amount, username } = req.body;
        const user = req.user.is; // Correctly assign user from req.user
        const username1 = req.user.name; // Correctly assign user from req.user
        console.log(user, username1)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const new_artpost = new artpost({
            user: user,
            username: username,
            filename: filename,
            contentType: contentType,
            tag: tag,
            imageBase64: imageBase64,
            bid_amount: bid_amount,
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

        const { comment } = req.body;
        const user = req.user.is; // Correctly assign user from req.user
        const artpost1 = req.params.id;

        const new_comment = new commentSchema({
            user: user,
            artpost: artpost1,
            comment: comment
        });

        const saved_new_artpost = await new_comment.save();
        res.json(saved_new_artpost);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ errors: 'Internal Server Error' });
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

        const like = true;
        const user = req.user.is; // Correctly assign user from req.user
        const artpost1 = req.params.id;

        const new_like = new likeSchema({
            user: user,
            artpost: artpost1,
            like: like
        });

        const saved_new_like = await new_like.save();
        res.json({ "Success": "Art post has been liked" ,"like =":saved_new_like});


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route 5: delete a post
router.delete('/deletepost/:id', getUser, async (req, res) => {
    try {
        // find the post to be deleted
        let del_artpost = await artpost.findById(req.params.id);
        if (!del_artpost) { return res.status(404).send("Not Found") }

        // Allow deletion for the authentic user
        console.log('del_artpost.user.toString() = ', del_artpost.user.toString());
        console.log('req.user.is = ', req.user.is);
        if (del_artpost.user.toString() !== req.user.is) {
            return res.status(404).send("Not Found")
        }

        del_artpost = await artpost.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Art post has been deleted" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ errors: 'Internal Server Error' })
    }
})

// 6. Route to remove like for a post
router.delete('/file_removelike/:id', getUser, async (req, res) => {
    try {
        // find the like to be removed
        let del_like = await likeSchema.findById(req.params.id);
        if (!del_like) { return res.status(404).send("Not Found") }

        // Allow deletion for the authentic user
        console.log('del_like.user.toString() = ', del_like.user.toString());
        console.log('req.user.is = ', req.user.is);
        if (del_like.user.toString() !== req.user.is) {
            return res.status(404).send("Not Found")
        }

        del_like = await likeSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Like has been removed" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 7. Route to remove comment for a post
router.delete('/file_removecomment/:id', getUser, async (req, res) => {
    try {
        // find the comment to be deleted
        let del_comment = await commentSchema.findById(req.params.id);
        if (!del_comment) { return res.status(404).send("Not Found") }

        // Allow deletion for the authentic user
        console.log('del_comment.user.toString() = ', del_comment.user.toString());
        console.log('req.user.is = ', req.user.is);
        if (del_comment.user.toString() !== req.user.is) {
            return res.status(404).send("Not Found")
        }

        del_comment = await commentSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Comment has been removed" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router;
