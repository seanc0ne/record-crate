const { Schema, model } = require('mongoose');
const moment = require('moment');

const TrackSchema = new Schema({
  artistId: {
    // WE'LL NEED TO REFERENCE THE ARTIST MODEL
    type: String,
    trim: true,
  },
  songTitle: {
    type: String,
    required: 'Song Title is Required',
    unique: true,
    trim: true,
  },
  sourceId: {
    // WE'LL NEED TO REFERENCE THE SOURCE MODEL
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  bpm: [
    {
      type: Number,
      trim: true,
    },
  ],
  key: [
    {
      type: String,
      trim: true,
    },
  ],
  length: [
    {
      type: String,
      trim: true,
    },
  ],
  notes: [
    {
      type: String,
      trim: true,
      maxlength: [280, 'Note must be 280 characters or less'],
    },
  ],
  waveform: [
    {
      type: String,
      trim: true,
    },
  ],
  composer: [
    {
      type: String,
      trim: true,
    },
  ],
  producer: [
    {
      type: String,
      trim: true,
    },
  ],
  billboard: [
    {
      type: String,
      trim: true,
    },
  ],
  chartPeak: [
    {
      type: String,
      trim: true,
    },
  ],
  dropbox: [
    {
      type: String,
      trim: true,
    },
  ],
});

// create the Track model using the TrackSchema
const Track = model('Track', TrackSchema);

// export the Track model
module.exports = Track;
