const axios = require("axios");
const keys = require("../../config/keys");
const moment = require("moment");

module.exports = app => {
  // CURRENT WEATHER
  app.get("/api/getCurrentWeather/:city", (req, res) => {
    console.log(req.params.city);
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${
        req.params.city
      }&units=metric&APPID=${keys.weatherID}`
    }).then(response => {
      const weatherID = {};
      weatherID.location = {
        city: response.data.name,
        country: response.data.sys.country
      };
      weatherID.weather = response.data.weather[0].description;
      weatherID.time = moment().format("dddd h:mm a");
      weatherID.tempRange = {
        temp: Math.round(response.data.main.temp),
        temp_min: Math.round(response.data.main.temp_min),
        temp_max: Math.round(response.data.main.temp_max)
      };

      axios({
        method: "GET",
        url: `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=${
          req.params.city
        }&client_id=${keys.unsplashID}`
      }).then(response => {
        console.log(response.data.results[0].urls.regular);
        weatherID.image = response.data.results[0].urls.regular;
        res.send(weatherID);
      });
    });
  });
  // FORECAST 16 DAYS
  app.get("/api/getWeatherForecast/:city", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${
        req.params.city
      }&APPID=${keys.weatherID}`
    }).then(response => {
      const data = response.data;
      const weatherID = {};
      weatherID.location = {
        city: data.city.name,
        country: data.city.country,
        population: data.city.population
      };
      weatherID.forecasts = [];
      const days = [
        data.list.slice(0, 8),
        data.list.slice(8, 16),
        data.list.slice(16, 24),
        data.list.slice(24, 32),
        data.list.slice(32, 40)
      ];
      days.map(day => {
        const dayID = {
          temperature: {
            temp: day[0].main.temp,
            temp_min: day[0].main.temp_min,
            temp_max: day[0].main.temp_max
          },
          weather: day[0].weather[0].description,
          date: moment(day[0].dt * 1000).format("dddd Do")
        };
        weatherID.forecasts.push(dayID);
      });
      res.send(weatherID);
    });
  });
};
