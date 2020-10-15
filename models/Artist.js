const { Schema, model } = require('mongoose');
const moment = require('moment');

const ArtistSchema = new Schema({
  artistName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  countryOfOrigin: {
    type: String,
    trim: true,
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
});

// create the Artist model using the ArtistSchema
const Artist = model('artist', ArtistSchema);

// export the Artist model
module.exports = Artist;
