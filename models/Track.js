const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const NoteSchema = new Schema(
  {
    noteText: {
      type: String,
      required: true,
      maxlength: [280, 'maximum of 280 characters allowed'],
    },
    public: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const TrackSchema = new Schema(
  {
    songTitle: {
      type: String,
      required: true,
      trim: true,
    },
    sourceId: {
      type: Schema.Types.ObjectId,
      ref: 'source',
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
    keys: [
      {
        type: String,
        trim: true,
      },
    ],
    bpms: [
      {
        type: Number,
        trim: true,
      },
    ],
    lengths: [
      {
        type: String,
        trim: true,
      },
    ],
    notes: [NoteSchema],
    composers: [
      {
        type: String,
        trim: true,
      },
    ],
    producers: [
      {
        type: String,
        trim: true,
      },
    ],
    billboardChartPeaks: [
      {
        type: String,
        trim: true,
      },
    ],
    chartPeakDates: [
      {
        type: String,
        trim: true,
      },
    ],
    dropboxUrls: [
      {
        type: String,
        trim: true,
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of notes on retrieval
TrackSchema.virtual('noteCount').get(function () {
  return this.notes.length;
});

// create the Track model using the TrackSchema
const Track = model('Track', TrackSchema);

// export the Track model
module.exports = Track;
