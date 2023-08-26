'use strict';

const axios = require('axios');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

async function getMovies(req, res) {
  const { city } = req.query;
    console.log("HERE IS OUR CITY: " + city);
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`);
    const movies = response.data.results;

    const movieList = movies.map((movie) => {
      const { title, overview, vote_average, vote_count, poster_path, popularity, release_date } = movie;
      return {
        title,
        overview,
        average_votes: vote_average,
        total_votes: vote_count,
        image_url: `https://image.tmdb.org/t/p/w500${poster_path}`,
        popularity,
        released_on: release_date
      };
    });

    res.json(movieList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = getMovies;