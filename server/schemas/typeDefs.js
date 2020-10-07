// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    avatar: String
    registeredAt: String
    playlists: [Playlist]
    followers: [User]
    playlistCount: Int
    followerCount: Int
  }
  type Playlist {
    _id: ID
    username: String
    title: String
    description: String
    public: Boolean
    image: String
    tracks: [Track]
    createdAt: String
    reactions: [Reaction]
    trackCount: Int
    reactionCount: Int
  }
  type Track {
    _id: ID
    artistId: String
    songTitle: String
    sourceId: String
    createdAt: String
    bpm: [Int]
    key: [String]
    length: [String]
    notes: [String]
    waveform: [String]
    composer: [String]
    producer: [String]
    billboard: [String]
    chartPeak: [String]
    dropbox: [String]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input trackInput {
    artistId: String
    songTitle: String
    sourceId: String
  }
  input playlistInput {
    title: String!
    description: String
    public: Boolean
    image: String
    tracks: [trackInput]
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    playlists(username: String): [Playlist]
    playlist(_id: ID!): Playlist
    tracks: [Track]
    track(_id: ID!): Track
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPlaylist(newPlaylist: playlistInput!): Playlist
    addReaction(playlistId: ID!, reactionBody: String!): Playlist
    addFollower(followerId: ID!): User
    addTrack(songTitle: String!): Track
  }
`;

// export the typeDefs
module.exports = typeDefs;
