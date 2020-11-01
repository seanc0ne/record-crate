const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Artist } = require('../../models');

// @route - POST api/artist/
// @desc - create or update an artist
// @access - private
router.post(
  '/',
  [auth, [check('artistName', 'An artist name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let artist = await Artist.findOne({
        artistName: req.body.artistName.toLowerCase(),
      });
      // if the artist already exists in the db, update it with new info only if user is the one who created the record in the first place.
      // return the artist as response.
      if (artist) {
        if (artist.userId.toString() !== req.user.id) {
          // b/c artist.userId is an object whereas req.user.id is a string
          return res.status(401).json({ msg: 'User not authorized' });
        } else {
          artist = await Artist.findOneAndUpdate(
            {
              artistName: req.body.artistName.toLowerCase(),
              userId: req.user.id,
            },
            { countryOfOrigin: req.body.countryOfOrigin },
            { new: true }
          ).populate({
            path: 'userId',
            select: 'name avatar',
          });
        }
        return res.json(artist);
      }
      // otherwise, create the record
      const newArtist = new Artist({
        userId: req.user.id,
        artistName: req.body.artistName,
        countryOfOrigin: req.body.countryOfOrigin,
      });
      artist = await newArtist.save();
      res.json(artist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - GET api/artist/
// @desc - get all artists
// @access - private
router.get('/', auth, async (req, res) => {
  try {
    const artists = await Artist.find()
      .sort({ artistName: 'ascending' })
      .populate({
        path: 'userId',
        select: 'name avatar',
      });
    res.json(artists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - GET api/artist/:artist_id
// @desc - get artist by artist ID
// @access - private
router.get('/:artist_id', auth, async (req, res) => {
  try {
    const artist = await Artist.findOne({
      _id: req.params.artist_id,
    }).populate({
      path: 'userId',
      select: 'name avatar',
    });
    if (!artist)
      return res.status(404).json({ msg: 'This artist was not found' });
    res.json(artist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/artist/:artist_id
// @desc - delete artist, source & tracks
// @access - private
router.delete('/:artist_id', auth, async (req, res) => {
  try {
    // remove artist
    const artist = await Artist.findOneAndRemove({
      _id: req.params.artist_id,
      userId: req.user.id,
    });
    if (!artist)
      return res.status(401).json({ msg: 'This artist cannot be deleted' });
    res.json({ msg: 'This artist has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
