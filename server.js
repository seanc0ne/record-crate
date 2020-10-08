const express = require('express');
const connectDB = require('./config/connection');
const mongoose = require('mongoose'); // can delete before going to production

const app = express();
const PORT = process.env.PORT || 3001;

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connect database
connectDB();

// Use this to log mongo queries being executed!
mongoose.set('debug', true); // can delete before going to production

app.listen(PORT, () => console.log(`🌍 Server started on port ${PORT}`));
