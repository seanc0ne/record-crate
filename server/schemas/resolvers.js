const { User, Playlist, Track } = require('../models');

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('playlists')
        .populate('followers');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('playlists')
        .populate('followers');
    },
    // get all playlists of all users or all playlists of a specific user if a username is provided
    playlists: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Playlist.find(params).sort({ createdAt: -1 }).select('-__v');
    },
    // get a playlist by _id
    playlist: async (parent, { _id }) => {
      return Playlist.findOne({ _id }).select('-__v');
    },
    // get all tracks
    tracks: async () => {
      return Track.find().select('-__v');
    },
    // get a track by _id
    track: async (parent, { _id }) => {
      return Track.findOne({ _id }).select('-__v');
    },
  },
};

module.exports = resolvers;
