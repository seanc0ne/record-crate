const { Schema, model } = require('mongoose');
const moment = require('moment');

const playlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
      // {
      //   trackId: {
      //     type: Schema.Types.ObjectId,
      //     ref: 'Track',
      //   },
      // },
      String,
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    },
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) =>
            moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

playlistSchema.virtual('tracksCount').get(function () {
  return this.tracks.length;
});

playlistSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

playlistSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

const Playlist = model('playlist', playlistSchema);

module.exports = Playlist;
