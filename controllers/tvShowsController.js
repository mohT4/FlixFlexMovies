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
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
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
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
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

//search for a T byv show title
exports.getTvShows = catchAsync(async (req, res, next) => {
  const tvTitle = req.query.name;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/tv?query=${tvTitle}&include_adult=false&language=en-US&`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
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
