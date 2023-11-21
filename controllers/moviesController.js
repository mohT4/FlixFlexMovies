const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const Favorites = require('../models/favorties');
const AppError = require('../utils/AppError');

//get all the popular movies in diffrent pages, with 10 results per page
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1;

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&limit=10`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
    },
  };

  const response = await axios.request(options);

  let movies = response.data.results;
  movies.length = 10;

  res.status(200).json({
    stauts: 'success',
    data: {
      page: page,
      results: movies.length,
      moveis: movies,
    },
  });
});

//get the top 5 rated movies
exports.getTopRated = catchAsync(async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
    },
  };

  const response = await axios.request(options);
  const movies = response.data.results.slice(0, 5);

  res.status(200).json({
    status: 'sucess',
    data: {
      results: movies.length,
      movies,
    },
  });
});

//search for a movie by title
exports.getMovies = catchAsync(async (req, res, next) => {
  //get the movie title from query
  const movieTitle = req.query.name;
  const year = req.query.year;

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&year=${year}`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
    },
  };

  const response = await axios.request(options);
  const movie = response.data.results;

  res.status(200).json({
    status: 'success',
    data: {
      movie: movie,
    },
  });
});

//get the movies trailer by id
exports.getMovieTrailer = catchAsync(async (req, res, next) => {
  //get the movie id from req.params
  const movieId = req.params.movieId;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
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

//get the movie details by id
exports.movieDetails = catchAsync(async (req, res, next) => {
  //get movi id from req.params
  const movieId = req.params.movieId;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
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
