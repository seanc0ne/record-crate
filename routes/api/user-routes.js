const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route - POST api/users
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

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size of the avatar
        r: 'pg', // rating
        d: 'mm', // default icon
      });
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
      // - get the payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      // - sign the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // optional, but recommended
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

module.exports = router;
