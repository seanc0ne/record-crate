const express = require('express');
const path = require('path');
const connectDB = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose'); // can delete before going to production

const app = express();
const PORT = process.env.PORT || 3001;

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);
// log mongo queries being executed
mongoose.set('debug', true); // can delete before going to production

// turn on connection to database and server
connectDB();
app.listen(PORT, () => console.log(`🌍 Server started on port ${PORT}`));
