const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

//get all the popular Tv shows in diffrent pages, with 10 results per page
exports.getAllTvShows = catchAsync(async (req, res, next) => {
  const page = req.query.page;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMB_JWT,
    },
  };

  const response = await axios.request(options);

  let tvShows = response.data.results;
  tvShows.length = 10;

  res.status(200).json({
    status: 'success',
    data: {
      page: page,
      results: tvShows.length,
      tvShows: tvShows,
    },
  });
});

//get the top 5 rated Tv Shows
exports.getTopTvShows = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMB_JWT,
    },
  };

  const response = await axios.request(options);
  const movies = response.data.results.slice(0, 5);

  res.status(200).json({
    status: 'success',
    data: {
      results: movies.length,
      movies: movies,
    },
  });
});

//search for a Tv show by title
exports.getTvShows = catchAsync(async (req, res, next) => {
  //we get the tv title and year from req.query
  const tvTitle = req.query.name;
  const year = req.query.year;

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/tv?query=${tvTitle}&include_adult=false&language=en-US&yea=${year}`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMB_JWT,
    },
  };

  const response = await axios.request(options);
  const tvShow = response.data.results;

  res.status(200).json({
    status: 'success',
    data: {
      tvShow: tvShow,
    },
  });
});

//get the tv show trailer by id
exports.getTvShowTrailer = catchAsync(async (req, res, next) => {
  const tvShowId = req.params.tvshowId;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${tvShowId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMB_JWT,
    },
  };

  const response = await axios.request(options);
  const trailer = response.data;

  res.status(200).json({
    status: 'success',
    data: {
      trailer: trailer,
    },
  });
});

//get the tv show datails by id
exports.tvShowDetails = catchAsync(async (req, res, next) => {
  const tvShowsId = req.params.tvShowsId;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${tvShowsId}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMB_JWT,
    },
  };

  const response = await axios.request(options);
  const details = response.data;

  res.status(200).json({
    status: 'success',
    data: {
      details: details,
    },
  });
});
