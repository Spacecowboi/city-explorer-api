'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const port = 3001; 
const W_API_KEY=process.env.WEATHER_API_KEY;
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.use(cors());

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${W_API_KEY}&lat=${lat}&lon=${lon}`);
  
    const data = response.data.data;

    const forecastItems = [];

    for (let i = 0; i < data.length; i++) {
      const date = data[i].datetime;
      const description = data[i].weather.description;
      const forecast = new Forecast(date, description);
      forecastItems.push(forecast);

      console.log(`Date: ${date}, Description: ${description}`);
    }

  res.json(forecastItems);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error. Dont worry its not you.'});
}
});

app.get('/movies', async (req, res) => {
  const { city } = req.query;

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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});