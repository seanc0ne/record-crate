const { Schema, model } = require('mongoose');
const moment = require('moment');

const SourceSchema = new Schema(
  {
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'artist',
        required: true,
      },
    ],
    source: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    years: [
      {
        type: Number,
        required: true,
      },
    ],
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

// create the Source model using the SourceSchema
const Source = model('source', SourceSchema);

// export the Source model
module.exports = Source;
