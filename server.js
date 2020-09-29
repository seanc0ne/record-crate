const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const app = express();
const PORT = process.env.PORT || 3001;

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connect database
mongoose.connect(db || 'mongodb://localhost/record-crate', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
