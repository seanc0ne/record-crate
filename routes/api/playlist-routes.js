const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Playlist, User } = require('../../models');

// @route - POST api/playlist/
// @desc - Create playlist
// @access - Private
router.post(
  '/',
  auth,
  [
    check('title', 'A title for your playlist is required').not().isEmpty(),
    check('tracks', 'Please enter at least one track in your playlist')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPlaylist = new Playlist({
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        public: req.body.public,
        image: req.body.image,
        tracks: req.body.tracks,
      });
      const playlist = await newPlaylist.save();
      res.json(playlist);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
