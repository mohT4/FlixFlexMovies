const express = require('express');
const authController = require('../controllers/authController');
const favoriteController = require('../controllers/favoritesController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(authController.protect, favoriteController.addTvShowToFavorite)
  .get(authController.protect, favoriteController.getFavorites);

module.exports = router;
