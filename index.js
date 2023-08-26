'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 
const W_API_KEY=process.env.WEATHER_API_KEY;
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;
const getWeather = require('./Components/Weather');
const getMovies = require('./Components/Movies');

app.use(cors());

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.listen(port, () => {console.log(`Server is running on port ${port}`);});