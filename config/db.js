const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.priqasf.mongodb.net/notes"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
