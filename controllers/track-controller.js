const { Track } = require('../models');

const trackController = {
  // get all tracks
  getAllTracks(req, res) {
    Track.find({})
      .then((dbTrackData) => res.json(dbTrackData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one track by id
  getTrackById({ params }, res) {
    Track.findOne({ _id: params.id })
      .select('-__v')
      .then((dbTrackData) => res.json(dbTrackData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createTrack
  createTrack({ body }, res) {
    Track.create(body)
      .then((dbTrackData) => res.json(dbTrackData))
      .catch((err) => res.status(400).json(err));
  },

  // update Track by id
  updateTrack({ params, body }, res) {
    Track.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbTrackData) => {
        if (!dbTrackData) {
          res.status(404).json({ message: 'No Track found with this id!' });
          return;
        }
        res.json(dbTrackData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete Track
  deleteTrack({ params }, res) {
    Track.findOneAndDelete({ _id: params.id })
      .then((dbTrackData) => {
        if (!dbTrackData) {
          res.status(404).json({ message: 'No Track found with this id!' });
          return;
        }
        res.json(dbTrackData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = trackController;
