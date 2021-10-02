const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/moodvies';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));



module.exports = db;
