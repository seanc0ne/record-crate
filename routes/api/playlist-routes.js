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
  [
    auth,
    [
      check('title', 'A title for your playlist is required').not().isEmpty(),
      check('tracks', 'At least one track is required').not().isEmpty(),
    ],
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

// @route - GET api/playlist/
// @desc - get all playlists
// @access - Private
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .sort({ createdAt: -1 })
      .select('-__v')
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'tracks',
        populate: {
          path: 'sourceId',
          select: 'source',
          populate: {
            path: 'artists',
            select: 'artistName',
          },
        },
      });
    res.json(playlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - GET api/playlist/:playlist_id
// @desc - get playlist by ID
// @access - Private
router.get('/:playlist_id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlist_id,
    })
      .select('-__v')
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'tracks',
        populate: {
          path: 'sourceId',
          select: 'source',
          populate: {
            path: 'artists',
            select: 'artistName',
          },
        },
      });
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist was not found' });
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/playlist/:playlist_id
// @desc - delete playlist by ID
// @access - Private
router.delete('/:playlist_id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndRemove({
      _id: req.params.playlist_id,
      userId: req.user.id,
    });
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist cannot be deleted' });
    res.json({ msg: 'This playlist has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
