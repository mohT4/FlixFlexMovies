const express = require('express');
const authController = require('../controllers/authController');
const favoriteController = require('../controllers/favoritesController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, favoriteController.getFavorites)
  .post(authController.protect, favoriteController.addMovieToFavorite)
  .delete(authController.protect, favoriteController.deleteMovieFromFavorite);

module.exports = router;
