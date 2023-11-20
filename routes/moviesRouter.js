const express = require('express');
const moviesController = require('../controllers/moviesController');

const router = express.Router();

router.get('/', moviesController.getAllMovies);
router.get('/top5rated', moviesController.getTopRated);
router.get('/search', moviesController.getMovies);

//router.route('/:id').get(moviesController.getMovie);

module.exports = router;
