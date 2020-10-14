const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Track = require('../../models/Track');
const Source = require('../../models/Track');
const Artist = require('../../models/Track');

// @route - POST api/track/
// @desc - create a post
// @access - private
router.post(
  '/',
  auth,
  [check('songTitle', 'A song title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTrack = new Track({
        userId: req.user.id,
        songTitle: req.body.songTitle,
        artistId: req.body.artistId,
        sourceId: req.body.sourceId,
      });
      const track = await newTrack.save();
      res.json(track);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
