const mongoose = require('mongoose');

// import environment variables
require('dotenv').config();

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.4q44g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db || 'mongodb://localhost/record-crate', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('🗄️  DATABASE CONNECTED...');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
