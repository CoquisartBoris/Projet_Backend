const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings : [{ userId: String, grade: Number }],
  averageRating: { type: Number, required: false, default: 0},
  userId: { type: String, required: true}
});

module.exports = mongoose.model('Book', bookSchema);