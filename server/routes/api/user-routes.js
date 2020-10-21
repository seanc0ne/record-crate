const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { User } = require('../../models');
const { Playlist } = require('../../models');
require('dotenv').config();

// @route - POST api/user/
// @desc - Register user
// @access - Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(), // check if a name is provided and it is not empty
    check('email', 'Please include a valid email').isEmail(), // check that input is formatted as an email address
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors ...
      return res.status(400).json({ errors: errors.array() }); // show all the error messages
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size of the avatar
        r: 'pg', // rating
        d: 'mm', // default icon
      });

      // create an instance of a User
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save new user to database
      await user.save();

      // return jsonwebtoken:
      // - get the payload (we're just going to send the user id, but we can add more fields)
      const payload = {
        user: {
          id: user._id,
        },
      };
      // - sign the token
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: process.env.expiration }, // optional, but recommended
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // send token back to client - we can use tokens and send them in access-protected routes
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - POST api/user/login
// @desc - Log in user & get token
// @access - Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists and store his/her info into variable 'dbUser'
      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // verify user (password provided needs to match password in the db)
      const isMatch = await bcrypt.compare(password, dbUser.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // return jsonwebtoken:
      // - get the payload
      const payload = {
        user: {
          id: dbUser._id,
        },
      };
      // - sign the token
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: process.env.expiration }, // optional, but recommended
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // send token back to client
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - GET api/user/
// @desc - Get current user
// @access - Private
router.get('/', auth, async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.id).select('-__v -password'); // leave off the password
    res.json(dbUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route - PUT api/user/
// @desc - Update current user
// @access - Private
router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(), // check if a name is provided and it is not empty
      check('email', 'Please include a valid email').isEmail(), // check that input is formatted as an email address
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const dbUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: req.body },
        { new: true }
      ).select('-__v -password');
      res.json(dbUser);
    } catch (err) {
      console.log(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'User not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route - DELETE api/user/
// @desc - Delete user and playlists
// @access - Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove user's playlists
    await Playlist.deleteMany({ userId: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted ' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
