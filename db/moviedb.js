const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const movieSchema = new mongoose.Schema({
  userName: String,
  favorites: Array
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {

  getAll: function (cb) {

    Movie.find()
      .exec((err, item) => {
        if (err) {
          cb(err);
        } else {
          cb(null, item);
        }
      });

  },

  getOne: function (query, cb) {

    Movie.findOne(query)
      .exec((err, item) => {
        if (err) {
          cb(err);
        } else {
          cb(null, item);
        }
      });

  },

  userName: function (person) {

    const options = { upsert: true}
    const query = { userName: person.userName };
    const userObj = {
      userName: person.userName,
      favorites: person.favorites
    };

    if (person.userName) {
      Movie.updateOne(query, { $set: userObj }, options, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success! (userName fn)')
        }
      });
    }

  },

  update: function (person) {

    const query = { userName: person.userName };
    const favorite = { favorites: person.favorites };

    if (person.userName) {
      Movie.updateOne(query, { $push: favorite }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success!')
        }
      })
    }
  }

};
