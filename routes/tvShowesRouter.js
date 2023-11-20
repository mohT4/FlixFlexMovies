const express = require('express');
const tvShowsController = require('../controllers/tvShowsController');

const router = express.Router();

router.get('/', tvShowsController.getAllTvShows);
router.get('/top5tvshows', tvShowsController.getTopTvShows);

router.get('/search', tvShowsController.getTvShows);
module.exports = router;
