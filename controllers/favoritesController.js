const Favorites = require('../models/favorties');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.addMovieToFavorite = catchAsync(async (req, res, next) => {
  //get req.user from the protect middleware
  const userId = req.user.id;

  //get the movie title from body
  const moviesTitle = req.body.movieTitle;

  if (!moviesTitle) {
    return next(
      new AppError(400, 'please enter the title of the movie you want to add.')
    );
  }

  //fetch the movie data from the external api
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${moviesTitle}&include_adult=false&language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
    },
  };

  const response = await axios.request(options);

  const movie = response.data.results;

  // find the existing Favorites document for the user
  const newFavorite = await Favorites.findOne({ user: userId });

  if (newFavorite) {
    // if it exists update the existing Favorites document by pushing the new movie to the movies array
    newFavorite.movies.push(...movie);

    // Save the changes
    const updatedFavorites = await newFavorite.save();

    //make the tv shows array undefiend so it won't be showed in the results
    updatedFavorites.tvShows = undefined;
    res.status(200).json({
      status: 'tv show added to the favorite list',
      data: {
        updatedFavorites,
      },
    });
  } else {
    // If no existing Favorites document is found, create a new one
    const newFavorites = new Favorites({
      user: userId,
      movie: movie,
    });

    const savedFavorites = await newFavorites.save();
    savedFavorites.movies = undefined;

    res.status(200).json({
      status: 'movie added to the favorite list',
      data: {
        savedFavorites,
      },
    });
  }
});

exports.addTvShowToFavorite = catchAsync(async (req, res, next) => {
  //we get req.user from the protect middleware
  const userId = req.user.id;

  //get the tv show title from the body
  const tvShowTitle = req.body.tvShowTitle;
  if (!tvShowTitle) {
    return next(
      new AppError(
        400,
        'please enter the title of the tv Show you want to add.'
      )
    );
  }

  //fetch tv show data from the external api
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/tv?query=${tvShowTitle}&include_adult=false&language=en-US&`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmOTI1YjNjOTc0MjI5MjMwYmQ4YjA2MzMwMDgzYyIsInN1YiI6IjY1NWE0ZWUxYjU0MDAyMTRkMTE4MDcwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wjFn97ypnIqva3t_VFOxG3al2_ohBqC27C4MGrlc7SI',
    },
  };

  const response = await axios.request(options);

  const tvShow = response.data.results;

  // find the existing Favorites document for the user
  const newFavorite = await Favorites.findOne({ user: userId });

  if (newFavorite) {
    // if it exists update the existing Favorites document by pushing the new TV show to the tvShows array
    newFavorite.tvShows.push(...tvShow);

    // Save the changes
    const updatedFavorites = await newFavorite.save();

    updatedFavorites.movies = undefined;
    res.status(200).json({
      sttatus: 'tv show added to the favorite list',
      data: {
        updatedFavorites,
      },
    });
  } else {
    // If no existing Favorites document is found, create a new one
    const newFavorites = new Favorites({
      user: userId,
      tvShows: tvShow,
    });

    const savedFavorites = await newFavorites.save();
    savedFavorites.movies = undefined;

    res.status(200).json({
      status: 'tvShow added to the favorite list',
      data: {
        savedFavorites,
      },
    });
  }
});

exports.deleteMovieFromFavorite = catchAsync(async (req, res, next) => {
  //get the movie title from the body
  const movieTitle = req.body.movieTitle;
  if (!movieTitle) {
    return next(
      new AppError(400, 'please enter the name of the movie you wanna remove')
    );
  }
  const movie = await Favorites.findOneAndDelete(movieTitle);
  if (!movie) return next(new AppError(400, 'no movie found with that title'));

  res.status(200).json({
    status: 'movie deleted form the list',
    data: null,
  });
});

exports.deleteShowFromFavorite = catchAsync(async (req, res, next) => {
  //get the tv show title from the body
  const tvShowTitle = req.body.tvShow;
  if (!tvShowTitle) {
    return next(
      new AppError(400, 'please enter the name of the tv show you wanna remove')
    );
  }
  const tvShow = await Favorites.findOneAndDelete(movirTitle);
  if (!tvShow)
    return next(new AppError(400, 'no tv show found with that title'));

  res.status(200).json({
    status: 'tvShow deleted form the list',
    data: null,
  });
});

exports.getFavorites = catchAsync(async (req, res, next) => {
  //get the user_id form protect
  const user_id = req.user.id;
  const favorites = await Favorites.findOne({ user: user_id }).populate(
    'user',
    'name'
  );

  //get data based on the routes
  if (req.originalUrl.split('/')[3] === 'movies') favorites.tvShows = undefined;
  else favorites.movies = undefined;
  res.status(200).json({
    status: 'success',
    data: {
      favorites,
    },
  });
});
