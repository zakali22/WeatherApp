const axios = require("axios");
const keys = require("../config/keys");

module.exports = app => {
  app.get("/api/getCurrentWeather/:city", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${
        req.params.city
      }&units=metric&APPID=${keys.weatherID}`
    })
      .then(response => {
        const weatherID = {};
        weatherID.location = {
          city: response.data.name,
          country: response.data.sys.country
        };
        weatherID.weather = response.data.weather[0].description;
        weatherID.tempRange = {
          temp: response.data.main.temp,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max
        };
        res.send(weatherID);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
