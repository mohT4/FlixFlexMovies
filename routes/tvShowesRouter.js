const express = require('express');
const tvShowsController = require('../controllers/tvShowsController');
const favoriteShowsRouter = require('./favoriteShowsRouter');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/favorites', favoriteShowsRouter);

//main series route
router.get('/', authController.protect, tvShowsController.getAllTvShows);

//top 5 rated series route
router.get(
  '/top5tvshows',
  authController.protect,
  tvShowsController.getTopTvShows
);

//search route
router.get('/search', authController.protect, tvShowsController.getTvShows);

//nested routes for gettin a series's trailer and details
router.get(
  '/search/:tvshowId/trailer',
  authController.protect,
  tvShowsController.getTvShowTrailer
);
router.get(
  '/search/:tvShowsId/details',
  authController.protect,
  tvShowsController.tvShowDetails
);
module.exports = router;
