const { Schema, model } = require('mongoose');
// const moment = require('moment');

const ArtistSchema = new Schema(
  {
    artistName: {
      type: String,
      unique: true,
      required: 'Artist name is required.',
      trim: true,
    },
    countryOfOrigin: {
      type: String,
    //   required: 'Country of origin is required.',
      unique: true,
      trim: true,
    }
}
);

// create the Artist model using the ArtistSchema
const Artist = model('Artist', ArtistSchema);

// export the Artist model
module.exports = Artist;