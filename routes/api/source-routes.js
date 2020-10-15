const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Source } = require('../../models');

// @route - POST api/source/
// @desc - create or update a source
// @access - private
router.post(
  '/',
  auth,
  [
    check('artistId', 'The artist is required').not().isEmpty(),
    check('source', 'The source is required').not().isEmpty(),
    check('label', 'The record label is required').not().isEmpty(),
    check('year', 'At least one year of release is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // build 'year' array
    const yearArr = req.body.year.split(',').map((yr) => yr.trim());

    try {
      let sourceInfo = await Source.findOne({
        artistId: req.body.artistId,
        source: req.body.source.toLowerCase(),
      });
      // if the source already exists in the db, update it with new info only if user is the one who created the record in the first place.
      // return the source as response.
      if (sourceInfo) {
        if (String(sourceInfo.userId) === req.user.id) {
          // b/c artist.userId is an object whereas req.user.id is a string
          sourceInfo = await Source.findOneAndUpdate(
            {
              userId: req.user.id,
              artistId: req.body.artistId,
              source: req.body.source.toLowerCase(),
            },
            {
              label: req.body.label,
              $push: { year: { $each: yearArr } },
            },
            { new: true }
          )
            .populate({
              path: 'userId',
              select: '-__v -password',
            })
            .populate({
              path: 'artistId',
              select: '-__v',
            });
        }
        return res.json(sourceInfo);
      }
      // otherwise, create the record
      const newSource = new Source({
        userId: req.user.id,
        artistId: req.body.artistId,
        source: req.body.source,
        label: req.body.label,
        year: yearArr,
      });
      sourceInfo = await newSource.save();
      res.json(sourceInfo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - GET api/source/
// @desc - get all sources
// @access - private
router.get('/', auth, async (req, res) => {
  try {
    const sources = await Source.find()
      .sort({ source: 'ascending' })
      .populate({
        path: 'userId',
        select: '-__v -password',
      })
      .populate({
        path: 'artistId',
        select: '-__v',
      });
    res.json(sources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - GET api/source/:source_id
// @desc - get source by source ID
// @access - private
router.get('/:source_id', auth, async (req, res) => {
  try {
    const sourceInfo = await Source.findOne({
      _id: req.params.source_id,
    })
      .populate({
        path: 'userId',
        select: '-__v -password',
      })
      .populate({
        path: 'artistId',
        select: '-__v',
      });
    res.json(sourceInfo);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Source not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/source/:source_id
// @desc - delete source & tracks
// @access - private
router.delete('/:source_id', auth, async (req, res) => {
  try {
    // @todo - remove tracks
    // remove source
    const sourceInfo = await Source.findOneAndRemove({
      _id: req.params.source_id,
      userId: req.user.id,
    });

    if (!sourceInfo)
      return res.status(400).json({ msg: 'Deletion not allowed' });
    res.json({ msg: 'Source and related Tracks deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Source not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
