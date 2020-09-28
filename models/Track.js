const { Schema, model } = require('mongoose');
// const moment = require('moment');

const TrackSchema = new Schema(
  {
    artistName: {
      type: String,
      unique: true,
      required: 'Artist Name is Required',
      trim: true,
    },
    songTitle: {
      type: String,
      required: 'Song Title is Required',
      unique: true,
      trim: true,
    },
    bpm: [
      {
        type: Number,
        required: 'Beats per Minute (BMP) is Required',
      }
    ],
    key: [
      {
        type: String,
      required: 'Song Key is Required',
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