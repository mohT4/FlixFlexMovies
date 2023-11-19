const express = require('express');
const moviesController = require('../controllers/moviesController');

const router = express.Router();

router.route('/').get(moviesController.getAllMovies);

router.route('/:id').get(moviesController.getMovie);

module.exports = router;
