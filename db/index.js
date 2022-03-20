const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost/moodvies";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

module.exports = db;
