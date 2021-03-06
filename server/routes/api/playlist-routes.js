const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Playlist, User } = require('../../models');

// @route - POST api/playlist/
// @desc - create a playlist
// @access - private
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
// @access - private
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
// @access - private
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
// @access - private
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

// @route - PUT api/playlist/like/:id
// @desc - like a playlist
// @access - private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist was not found' });
    // check if the playlist has already been liked by this user
    if (
      playlist.likes.filter((like) => like.userId.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already liked this playlist' });
    }
    playlist.likes.unshift({ userId: req.user.id });
    await playlist.save();
    res.json(playlist.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - PUT api/playlist/unlike/:id
// @desc - unlike a playlist
// @access - private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist was not found' });
    // check if the playlist has already been liked by this user
    if (
      playlist.likes.filter((like) => like.userId.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have not liked this playlist yet' });
    }
    // get like's index
    const likeIndex = playlist.likes
      .map((like) => like.userId.toString())
      .indexOf(req.user.id);
    playlist.likes.splice(likeIndex, 1);
    await playlist.save();
    res.json(playlist.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - POST api/playlist/:playlist_id/comment
// @desc - add a comment to a playlist
// @access - private
router.put(
  '/:playlist_id/comment',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const playlist = await Playlist.findByIdAndUpdate(
        { _id: req.params.playlist_id },
        {
          $push: {
            comments: {
              text: req.body.text,
              public: req.body.public,
              userId: req.user.id,
            },
          },
        },
        { new: true }
      ).select('-__v');
      if (!playlist)
        return res.status(404).json({ msg: 'This playlist was not found' });
      res.json(playlist.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - PUT api/playlist/:playlist_id/comment/:comment_id
// @desc - update a comment from a playlist
// @access - private
router.put('/:playlist_id/comment/:comment_id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlist_id,
    }).select('-__v');
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist was not found' });
    // pull out comment
    const commentIndex = playlist.comments
      .map((comment) => comment._id)
      .indexOf(req.params.comment_id);
    if (commentIndex === -1)
      return res.status(404).json({ msg: 'This comment was not found' });
    const commentToEdit = playlist.comments[commentIndex];
    // check user
    if (commentToEdit.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });
    // insert edits
    if (req.body.text) commentToEdit.text = req.body.text;
    if (req.body.public) commentToEdit.public = req.body.public;
    playlist.comments.splice(commentIndex, 1, commentToEdit);
    await playlist.save();
    return res.json(playlist.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/playlist/:playlist_id/comment/:comment_id
// @desc - delete a comment from a playlist
// @access - private
router.delete('/:playlist_id/comment/:comment_id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlist_id,
    }).select('-__v');
    if (!playlist)
      return res.status(404).json({ msg: 'This playlist was not found' });
    // pull out comment
    const commentIndex = playlist.comments
      .map((comment) => comment._id)
      .indexOf(req.params.comment_id);
    if (commentIndex === -1)
      return res.status(404).json({ msg: 'This comment was not found' });
    const commentToEdit = playlist.comments[commentIndex];
    // check user
    if (commentToEdit.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });
    // delete comment
    playlist.comments.splice(commentIndex, 1);
    await playlist.save();
    return res.json(playlist.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
