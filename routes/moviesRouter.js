const express = require('express');
const moviesController = require('../controllers/moviesController');
const authController = require('../controllers/authController');
const favoriteMoviesRouter = require('./favoriteMoviesRouter');

const router = express.Router();

router.use('/favorites', favoriteMoviesRouter);

router.route('/popular', moviesController.getAllMovies);
router.get('/top5rated', moviesController.getTopRated);
router.get('/search', moviesController.getMovies);

module.exports = router;
