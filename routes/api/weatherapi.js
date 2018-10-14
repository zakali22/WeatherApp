const axios = require("axios");
const keys = require("../../config/keys");
const moment = require("moment");

module.exports = app => {
  // CURRENT WEATHER
  app.post("/api/getCurrentWeather", (req, res) => {
    console.log(req.body.city_name);
    let city = req.body.city_name;
    if (req.body.city_name === "" || req.body.city_name === undefined) {
      city = "London";
    }

    const requests = [
      axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${
          keys.weatherID
        }`
      }),
      axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${
          keys.weatherID
        }`
      }),
      axios({
        method: "GET",
        url: `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=${city}+city+building&client_id=${
          keys.unsplashID
        }`
      })
    ];
    Promise.all(requests)
      .then(data => {
        const weatherResponse = data[0].data;
        const forecastResponse = data[1].data;

        const imageResponse = data[2].data.results[2];
        const weatherID = {};
        weatherID.location = {
          city: weatherResponse.name,
          country: weatherResponse.sys.country
        };
        weatherID.weather = weatherResponse.weather[0].description;
        weatherID.time = moment().format("dddd h:mm a");
        weatherID.tempRange = {
          temp: Math.round(weatherResponse.main.temp),
          temp_min: Math.round(weatherResponse.main.temp_min),
          temp_max: Math.round(weatherResponse.main.temp_max)
        };
        weatherID.forecasts = [];
        const days = [
          forecastResponse.list.slice(0, 8),
          forecastResponse.list.slice(8, 16),
          forecastResponse.list.slice(16, 24),
          forecastResponse.list.slice(24, 32),
          forecastResponse.list.slice(32, 40)
        ];
        days.map(day => {
          const dayID = {
            temperature: {
              temp: Math.round(day[0].main.temp),
              temp_min: Math.round(day[0].main.temp_min),
              temp_max: Math.round(day[0].main.temp_max)
            },
            weather: day[0].weather[0].description,
            date: moment(day[0].dt * 1000).format("dddd")
          };
          weatherID.forecasts.push(dayID);
        });
        weatherID.image = imageResponse.urls.regular;
        return weatherID;
      })
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
