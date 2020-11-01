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
      showTrack,
    } = req.body;

    // build track object
    const trackObj = {};
    trackObj.userId = req.user.id;
    trackObj.songTitle = songTitle;
    trackObj.showTrack = showTrack;
    if (sourceId) trackObj.sourceId = sourceId;
    if (keys.length > 0)
      trackObj.keys = keys.split(',').map((key) => key.trim());
    if (bpms.length > 0)
      trackObj.bpms = bpms.split(',').map((bpm) => bpm.trim());
    if (lengths.length > 0)
      trackObj.lengths = lengths.split(',').map((length) => length.trim());
    if (composers.length > 0)
      trackObj.composers = composers
        .split(',')
        .map((composer) => composer.trim());
    if (producers.length > 0)
      trackObj.producers = producers
        .split(',')
        .map((producer) => producer.trim());
    if (billboardChartPeaks.length > 0)
      trackObj.billboardChartPeaks = billboardChartPeaks
        .split(',')
        .map((billboardChartPeak) => billboardChartPeak.trim());
    if (chartPeakDates.length > 0)
      trackObj.chartPeakDates = chartPeakDates
        .split(',')
        .map((chartPeakDate) => chartPeakDate.trim());
    if (dropboxUrls.length > 0)
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
      .select('-__v')
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'sourceId',
        select: 'sourceName label years',
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
// @desc - get track by ID
// @access - private
router.get('/:track_id', auth, async (req, res) => {
  try {
    const track = await Track.findOne({
      _id: req.params.track_id,
    })
      .select('-__v')
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .populate({
        path: 'sourceId',
        select: 'sourceName label years',
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
      return res.status(404).json({ msg: 'This track was not found' });
    res.json(track);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - PUT api/track/:track_id
// @desc - update a track
// @access - private
router.put('/', auth, async (req, res) => {
  console.log('************** inside server - endpoint api/track/:track_id');
  console.log('req.body', req.body);
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
    showTrack,
  } = req.body;

  // build track object
  const trackObj = {};
  trackObj.userId = req.user.id;
  trackObj.songTitle = songTitle;
  trackObj.showTrack = showTrack;
  if (sourceId) trackObj.sourceId = sourceId;
  if (keys.length > 0) trackObj.keys = keys.split(',').map((key) => key.trim());
  if (bpms.length > 0) trackObj.bpms = bpms.split(',').map((bpm) => bpm.trim());
  if (lengths.length > 0)
    trackObj.lengths = lengths.split(',').map((length) => length.trim());
  if (composers.length > 0)
    trackObj.composers = composers
      .split(',')
      .map((composer) => composer.trim());
  if (producers.length > 0)
    trackObj.producers = producers
      .split(',')
      .map((producer) => producer.trim());
  if (billboardChartPeaks.length > 0)
    trackObj.billboardChartPeaks = billboardChartPeaks
      .split(',')
      .map((billboardChartPeak) => billboardChartPeak.trim());
  if (chartPeakDates.length > 0)
    trackObj.chartPeakDates = chartPeakDates
      .split(',')
      .map((chartPeakDate) => chartPeakDate.trim());
  if (dropboxUrls.length > 0)
    trackObj.dropboxUrls = dropboxUrls
      .split(',')
      .map((dropboxUrl) => dropboxUrl.trim());

  // update the data
  try {
    let track = await Track.findOneAndUpdate(
      { _id: req.params.track_id },
      { $set: trackObj },
      { new: true }
    );
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

// @route - PUT api/track/:track_id/note
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
              showNote: req.body.showNote,
              userId: req.user.id,
            },
          },
        },
        { new: true }
      );
      if (!track)
        return res.status(404).json({ msg: 'This track was not found' });
      console.log('track', track);
      res.json(track);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route - PUT api/track/:track_id/note/:note_id
// @desc - update a note from a track
// @access - private
router.put('/:track_id/note/:note_id', auth, async (req, res) => {
  try {
    const track = await Track.findOne({ _id: req.params.track_id }).select(
      '-__v'
    );
    if (!track)
      return res.status(404).json({ msg: 'This track was not found' });
    // pull out note
    const noteIndex = track.notes
      .map((note) => note._id)
      .indexOf(req.params.note_id);
    if (noteIndex === -1)
      return res.status(404).json({ msg: 'This note was not found' });
    const noteToEdit = track.notes[noteIndex];
    // check user
    if (noteToEdit.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });
    // insert edits
    noteToEdit.showNote = req.body.showNote;
    if (req.body.noteText) noteToEdit.noteText = req.body.noteText;
    track.notes.splice(noteIndex, 1, noteToEdit);
    await track.save();
    return res.json(track.notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route - DELETE api/track/:track_id/note/:note_id
// @desc - delete a note from a track
// @access - private
router.delete('/:track_id/note/:note_id', auth, async (req, res) => {
  try {
    const track = await Track.findOne({ _id: req.params.track_id }).select(
      '-__v'
    );
    if (!track)
      return res.status(404).json({ msg: 'This track was not found' });
    // pull out note
    const noteIndex = track.notes
      .map((note) => note._id)
      .indexOf(req.params.note_id);
    if (noteIndex === -1)
      return res.status(404).json({ msg: 'This note was not found' });
    const noteToEdit = track.notes[noteIndex];
    // check user
    if (noteToEdit.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });
    // delete note
    track.notes.splice(noteIndex, 1);
    await track.save();
    return res.json(track.notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
