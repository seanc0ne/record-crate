const { Schema, model } = require('mongoose');
// const moment = require('moment');

const SourceSchema = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
  },
  source: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  year: [
    {
      type: Number,
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // artworkImage: [
  //   {
  //     type:
  //     required:
  //   }
  // ]
});

// create the Source model using the SourceSchema
const Source = model('source', SourceSchema);

// export the Source model
module.exports = Source;
