const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const playlistSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Track',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

playlistSchema.virtual('trackCount').get(function () {
  return this.tracks.length;
});

playlistSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Playlist = model('Playlist', playlistSchema);

module.exports = Playlist;
