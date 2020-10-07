const { AuthenticationError } = require('apollo-server-express');
const { User, Playlist, Track } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('playlists')
          .populate('followers');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
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
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
