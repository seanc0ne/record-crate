const { Schema, model } = require('mongoose');
const moment = require('moment');

const TrackSchema = new Schema(
  {
    artistId: {
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
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    bpm: [
      {
        type: Number,
        trim: true,
      }
    ],
    key: [
      {
        type: String,
        trim: true,
      }
    ],
    length: [
      {
        type: String,
        trim: true,
      }
    ],
    notes: [
      {
        type: String,
        trim: true,
        maxlength: [280, "Note must be 280 characters or less"],
      }
    ],
    waveform: [
      {
        type: String,
        trim: true,
      }
    ],
    composer: [
      {
        type: String,
        trim: true,
      }
    ],
    producer: [
      {
        type: String,
        trim: true,
      }
    ],
    billboard: [
      {
        type: String,
        trim: true,
      }
    ],
    chartPeak: [
      {
        type: String,
        trim: true,
      }
    ],
    dropbox: [
      {
        type: String,
        trim: true,
      }
    ]
  },
  {
    toJSON: {
    //   virtuals: true,
    //   getters: true
    },
    id: false
  }
);

// create the Track model using the TrackSchema
const Track = model('Track', TrackSchema);

// export the Track model
module.exports = Track;