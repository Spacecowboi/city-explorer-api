'use strict';

const express = require('express');
const app = express();
const port = 3001; 
const weatherData = require('./data/weather.json');


app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  console.log(lat, lon, searchQuery);
  const city = weatherData.find(city => {
    console.log(city);
    return (
      city.lat === parseFloat(lat) &&
      city.lon === parseFloat(lon) ||
      (city.city_name.toLowerCase() === searchQuery.toLowerCase()  )
    );
  });

// Lines 13-19 built with ChatGPT //
//if there isn't a city, slap the 404 on em

  if (!city) {
    return res.status(404).json({ error: 'City not found.' });
  }

  
  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }

  const forecastArray = city.data.map(dataPoint => {
    console.log('THIS IS A DATAPOINT: ', dataPoint);
    return new Forecast(dataPoint.datetime, dataPoint.weather.description);
  });

  res.json(forecastArray);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});