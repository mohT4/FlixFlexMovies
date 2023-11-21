const express = require('express');
const moviesController = require('../controllers/moviesController');
const authController = require('../controllers/authController');
const favoriteMoviesRouter = require('./favoriteMoviesRouter');

const router = express.Router();

router.use('/favorites', favoriteMoviesRouter);

//main movies route
router.get('/', authController.protect, moviesController.getAllMovies);

//top 5 rated movies routes
router.get('/top5rated', authController.protect, moviesController.getTopRated);

//search route
router.get('/search', authController.protect, moviesController.getMovies);

//nested routes for gettin a movie's trailer and details
router.get(
  '/search/:movieId/trailer',
  authController.protect,
  moviesController.getMovieTrailer
);
router.get(
  '/search/:movieId/details',
  authController.protect,
  moviesController.movieDetails
);

module.exports = router;
