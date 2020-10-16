const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { Track } = require('../../models');

// @route - POST api/track/
// @desc - add a track
// @access - private
router.post(
  '/',
  [auth, [check('songTitle', 'A song title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      songTitle,
      sourceId,
      keys,
      bpms,
      lengths,
      composers,
      producers,
      billboardChartPeaks,
      chartPeakDates,
      dropboxUrls,
      public,
    } = req.body;

    // build track object
    const trackObj = {};
    trackObj.userId = req.user.id;
    trackObj.songTitle = songTitle;
    if (sourceId) trackObj.sourceId = sourceId;
    if (public) trackObj.public = public;
    if (keys) trackObj.keys = keys.split(',').map((key) => key.trim());
    if (bpms) trackObj.bpms = bpms.split(',').map((bpm) => bpm.trim());
    if (lengths)
      trackObj.lengths = lengths.split(',').map((length) => length.trim());
    if (composers)
      trackObj.composers = composers
        .split(',')
        .map((composer) => composer.trim());
    if (producers)
      trackObj.producers = producers
        .split(',')
        .map((producer) => producer.trim());
    if (billboardChartPeaks)
      trackObj.billboardChartPeaks = billboardChartPeaks
        .split(',')
        .map((billboardChartPeak) => billboardChartPeak.trim());
    if (chartPeakDates)
      trackObj.chartPeakDates = chartPeakDates
        .split(',')
        .map((chartPeakDate) => chartPeakDate.trim());
    if (dropboxUrls)
      trackObj.dropboxUrls = dropboxUrls
        .split(',')
        .map((dropboxUrl) => dropboxUrl.trim());

    // insert the data
    try {
      const track = new Track(trackObj);
      await track.save();
      res.json(track);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - GET api/track/
// @desc - get all tracks
// @access - private
router.get('/', auth, async (req, res) => {
  try {
    const tracks = await Track.find()
      .sort({ songTitle: 'ascending' })
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'sourceId',
        select: 'source label years',
        populate: {
          path: 'userId',
          select: 'name avatar',
        },
        populate: {
          path: 'artists',
          select: 'artistName countryOfOrigin',
          populate: {
            path: 'userId',
            select: 'name avatar',
          },
        },
      });
    res.json(tracks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - GET api/track/:track_id
// @desc - get track by track ID
// @access - private
router.get('/:track_id', auth, async (req, res) => {
  try {
    const track = await Track.findOne({
      _id: req.params.track_id,
    })
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'sourceId',
        select: 'source label years',
        populate: {
          path: 'userId',
          select: 'name avatar',
        },
        populate: {
          path: 'artists',
          select: 'artistName countryOfOrigin',
          populate: {
            path: 'userId',
            select: 'name avatar',
          },
        },
      });
    if (!track)
      return res.status(400).json({ msg: 'This track was not found' });
    res.json(track);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/track/:track_id
// @desc - delete a track
// @access - private
router.delete('/:track_id', auth, async (req, res) => {
  try {
    const track = await Track.findOneAndRemove({
      _id: req.params.track_id,
      userId: req.user.id,
    });
    if (!track)
      return res.status(400).json({ msg: 'This track cannot be deleted' });
    res.json({ msg: 'This track has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - PUT api/:track_id/note
// @desc - add note to a track
// @access - private
router.put(
  '/:track_id/note',
  [auth, [check('noteText', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const track = await Track.findOneAndUpdate(
        { _id: req.params.track_id },
        {
          $push: {
            notes: {
              noteText: req.body.noteText,
              public: req.body.public,
              userId: req.user.id,
            },
          },
        },
        { new: true }
      ).select('-__v');
      if (!track)
        return res.status(400).json({ msg: 'This track was not found' });
      res.json(track);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
