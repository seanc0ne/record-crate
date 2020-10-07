const { Schema, model } = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user,
// we'll also get another field called `crateCount` with the number of crates a user has saved
userSchema.virtual('playlistCount').get(function () {
  return this.playlists.length;
});
// as well as a field called `followerCount` with the number of followers a user has
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

const User = model('User', userSchema);

module.exports = User;
