const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: Schema.Types.String,
  genre: Schema.Types.String,
  authorid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

// Model name: Book, schema: bookSchema
module.exports = mongoose.model("Book", bookSchema);
