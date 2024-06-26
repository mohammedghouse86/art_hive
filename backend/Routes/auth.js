const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../Models/user_Schema.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const jwt_SECRET = "BLAH#BL@#";
var getUser = require('../MiddleWare/GetUser.js')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


// ROUTE - 1 Creating a User using POST "/api/auth". Dosen't require auth
router.post('/', upload.single('file'), [
     body('name', 'enter a valid name').isLength({ min: 3 }),
     body('email', 'enter a valid email').isEmail(),
     body('password', 'enter password with minimum 5 charecters').isLength({ min: 5 }),
     body('date_of_birth', 'enter password with minimum 5 charecters').isDate(),
     body('imageBase64', 'photo not properly uploaded').isLength({ min: 3 })
], async (req, res) => {
     // if there are errors sending the post message send bad request
     //const { originalname, mimetype, buffer } = req.file;
     //const imageBase64 = buffer.toString('base64');
     let success = false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     // check whether the user with this email exists already
     try {
          let user = await User.findOne({ email: req.body.email })
          if (user) {
               return res.status(400).json({ errors: 'something went wrong' })
          }
          console.log(user)
          const salt = await bcrypt.genSalt(10);
          secPaWO = await bcrypt.hash(req.body.password, salt)

          // create a new user
          user = await User.create({
               name: req.body.name,
               password: secPaWO,
               email: req.body.email,
               date_of_birth: req.body.date_of_birth,
               imageBase64: req.body.imageBase64
          })

          // creating and sending the JSON WEB TOKEN
          const data = {
               user: { is: user.id }
          }
          const authtoken = jwt.sign(data, jwt_SECRET);

          success = true
          res.json({ success, authtoken })
     }
     catch (error) {
          console.error(error.message);
          return res.status(400).json({ errors: 'something went wrong' })
     }
     //.then(user => res.json(user));

})

// ROUTE - 2 Authentication of a user using POST "api/auth/login". No login required. 
router.post('/login', [
     body('email', 'enter a valid email').isEmail(),
     body('password', 'enter password with minimum 5 charecters').exists(),
], async (req, res) => {
     // if there are errors sending the post message send bad request
     let success = false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     const { email, password } = req.body;
     try {
          const jwt_SECRET = "BLAH#BL@#";
          let user = await User.findOne({ email });

          if (!user) {
               success = false
               return res.status(400).json({ errors: "Please try to login with correct credentials" });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          console.log(password, user.password);
          if (!passwordCompare) {
               success = false
               return res.status(400).json({ errors: "Please try to login with correct credentials" });
          }
          const data = {
               user: { is: user.id }
          }
          const authtoken = jwt.sign(data, jwt_SECRET);
          success = true


          res.json({ success, authtoken })
     }
     catch (error) {
          console.error(error.message);
          return res.status(400).json({ errors: 'something went wrong' })
     }
})


// ROUTE - 3 Getting logging user details using POST "api/auth/getuser". No login required. 
router.post('/getuser', getUser, async (req, res) => {
     try {
          let userIs = req.user.is; // userId = req.user.id; note req.user.id dosen't work. Since data =  { user: { is: '663b9782ee0a0e158a12c079' }, iat: 1715181442 }
          console.log('req.user.is', req.user.is);
          const user = await User.findById(userIs).select("-password")
          res.send(user);
          console.log(user);
     } catch (error) {
          console.error(error.message);
          res.status(500).send('Internal Server Error');
     }
})


// ROUTE - 4 Getting logged in user display pic
router.post('/getuser_displaypic', getUser, async (req, res) => {
     try {
          let userIs = req.user.is; // userId = req.user.id; note req.user.id dosen't work. Since data =  { user: { is: '663b9782ee0a0e158a12c079' }, iat: 1715181442 }
          console.log('req.user.is', req.user.is);
          const user = await User.findById(userIs).select("-password")
          //console.log(user);
          res.set('Content-Type', 'image/jpeg');
          res.set('Content-Disposition', `attachment; filename="${user.name}.jpg"`);
          res.send(Buffer.from(user.imageBase64, 'base64'));
     } catch (error) {
          console.error(error.message);
          res.status(500).send('Internal Server Error');
     }
})


// ROUTE - 5 Getting logged in user details
router.post('/getloggedin_user/:id', async (req, res) => {
     try {
          var jwt = require('jsonwebtoken');
          const jwt_SECRET = "BLAH#BL@#";
          const token = req.params.id; // userId = req.user.id; note req.user.id dosen't work. Since data =  { user: { is: '663b9782ee0a0e158a12c079' }, iat: 1715181442 }
          if (!token) {
               return res.status(401).send({ Error: "INVALID TOKEN BRAV!!!!" });
          }
          const data = jwt.verify(token, jwt_SECRET);
          const dude = data.user.is;
          const user = await User.findById(dude).select("-password")
          //res.send(user)
          return (res.json(user))
     } catch (error) {
          console.error(error.message);
          res.status(500).send('Internal Server Error');
     }
})

// ROUTE - 6 Fetching all Userrs
router.get('/fetchallusers', getUser, async (req, res) => {
     const users = await User.find().populate('name imageBase64').select("-password"); // Populating user with name field;
     res.json(users);
 })

module.exports = router