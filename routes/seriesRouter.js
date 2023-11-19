const express = require('express');
const seriesController = require('../controllers/seriesController');

const router = express.Router();

router.route('/').get(seriesController.getAllSeries);

router.route('/:id').get(seriesController.getSerie);

module.exports = router;
