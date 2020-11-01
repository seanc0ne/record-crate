const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Source } = require('../../models');

// @route - POST api/source/
// @desc - add a source
// @access - private
router.post(
  '/',
  [
    auth,
    [
      check('artists', 'At least one artist is required').not().isEmpty(),
      check('sourceName', 'The source is required').not().isEmpty(),
      check('label', 'The record label is required').not().isEmpty(),
      check('years', 'At least one year of release is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // build the 'years' array - artists will be selected from the existing collection
    const years = req.body.years.split(',').map((year) => year.trim());

    // insert the new source data
    try {
      const newSource = new Source({
        userId: req.user.id,
        artists: req.body.artists,
        sourceName: req.body.sourceName,
        label: req.body.label,
        years: years,
      });
      const sourceInfo = await newSource.save();
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
      .sort({ sourceName: 'ascending' })
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'artists',
        select: 'artistName countryOfOrigin',
        populate: {
          path: 'userId',
          select: 'name avatar',
        },
      });
    res.json(sources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - GET api/source/:source_id
// @desc - get source by ID
// @access - private
router.get('/:source_id', auth, async (req, res) => {
  try {
    const sourceInfo = await Source.findOne({
      _id: req.params.source_id,
    })
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'artists',
        select: 'artistName countryOfOrigin',
        populate: {
          path: 'userId',
          select: 'name avatar',
        },
      });
    if (!sourceInfo)
      return res.status(404).json({ msg: 'This source was not found' });
    res.json(sourceInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - PUT api/source/
// @desc - add a source
// @access - private
router.post('//:source_id', auth, async (req, res) => {
  console.log('************** inside server - endpoint api/source/:source_id');
  console.log('req.body', req.body);
  const { sourceName, artists, label, years } = req.body;

  // build source object
  const sourceObj = {};
  sourceObj.userId = req.user.id;
  sourceObj.sourceName = sourceName;
  sourceObj.artists = artists;
  sourceObj.label = label;
  if (years.length > 0)
    sourceObj.years = years.split(',').map((year) => year.trim());

  // insert the data
  try {
    let source = await Source.findOneAndUpdate(
      { _id: req.params.source_id },
      { $set: sourceObj },
      { new: true }
    );
    res.json(source);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/source/:source_id
// @desc - delete source & tracks
// @access - private
router.delete('/:source_id', auth, async (req, res) => {
  try {
    const sourceInfo = await Source.findOneAndRemove({
      _id: req.params.source_id,
      userId: req.user.id,
    });

    if (!sourceInfo)
      return res.status(401).json({ msg: 'This source cannot be deleted' });
    res.json({ msg: 'This source has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
