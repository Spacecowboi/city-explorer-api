'use strict';

const express = require('express');
const app = express();
const port = 3000; 
const weatherData = require('./weather.json');


app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  
  const city = weatherData.find(city => {
    return (
      city.lat === parseFloat(lat) &&
      city.lon === parseFloat(lon) &&
      (city.city === searchQuery || city.name === searchQuery)
    );
  });

  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }

  
  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }

  const forecastArray = city.data.map(dataPoint => {
    return new Forecast(dataPoint.date, dataPoint.description);
  });

  res.json(forecastArray);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});