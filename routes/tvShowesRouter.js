const express = require('express');
const tvShowsController = require('../controllers/tvShowsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/', authController.protect, tvShowsController.getAllTvShows);
router.get(
  '/top5tvshows',
  authController.protect,
  tvShowsController.getTopTvShows
);

router.get('/search', authController.protect, tvShowsController.getTvShows);
module.exports = router;
