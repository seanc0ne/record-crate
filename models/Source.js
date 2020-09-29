const { Schema, model } = require('mongoose');
// const moment = require('moment');

const SourceSchema = new Schema(
  {
    artistName: {
      type: String,
      unique: true,
      required: 'Artist name is required.',
      trim: true,
    },
    recordLabel: {
      type: String,
      required: 'Record label is required.',
      unique: true,
      trim: true,
    },
    year: [
      {
        type: Number,
        required: 'Year of release is required.',
      }
    ],
    // artworkImage: [
    //   {
    //     type: 
    //     required:
    //   }
    // ]
  },
  {
    toJSON: {
    //   virtuals: true,
    //   getters: true
    },
    id: false
  }
);

// create the Source model using the SourceSchema
const Source = model('Source', SourceSchema);

// export the Source model
module.exports = Source;