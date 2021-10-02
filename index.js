const express = require('express');
const bodyParser = require('body-parser');
const Movies = require('./db/moviedb.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/client/dist'));

app.get('/', (req, res) => {
  res.send('hello moto');
})

app.get('/favs', function (req, res) {

  Movies.getAll((err, item) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  });

});

app.get('/favs/:userName', function (req, res) {

  let user = req.params;

  Movies.getOne(user, (err, item) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  });

});

app.post('/favs/:userName', (req, res) => {

  Movies.userName(req.body);

});

app.post('/favs', (req, res) => {

  Movies.update(req.body);

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});