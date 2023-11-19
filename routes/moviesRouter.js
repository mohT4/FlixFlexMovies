const express = require('express');
const moviesController = require('../controllers/moviesController');

const router = express.Router();

router
  .route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovies);

router
  .route('/:id')
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;
