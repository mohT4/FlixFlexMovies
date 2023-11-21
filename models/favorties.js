const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
  },
  movies: [
    {
      title: {
        type: String,
        required: true,
      },
      original_language: String,

      overview: String,

      poster_path: String,

      release_date: Date,
    },
  ],
  tvShows: [
    {
      name: {
        type: String,
        require: true,
      },
      original_language: String,
      overview: String,
      poster_path: String,
      first_air_date: Date,
    },
  ],
});

// Custom static method to update or create favorites

const Favorites = mongoose.model('favorites', favoritesSchema);

module.exports = Favorites;
