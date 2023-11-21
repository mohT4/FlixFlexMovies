const express = require('express');
const tvShowsController = require('../controllers/tvShowsController');
const favoriteShowsRouter = require('./favoriteShowsRouter');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/favorites', favoriteShowsRouter);

router.get('/', authController.protect, tvShowsController.getAllTvShows);
router.get(
  '/top5tvshows',
  authController.protect,
  tvShowsController.getTopTvShows
);

router.get('/search', authController.protect, tvShowsController.getTvShows);
module.exports = router;
