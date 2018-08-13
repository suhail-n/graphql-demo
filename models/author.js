const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: Schema.Types.String,
  age: Schema.Types.String
});

module.exports = mongoose.model("Author", authorSchema);
