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
        url: `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=${city}&client_id=${
          keys.unsplashID
        }`
      })
    ];
    Promise.all(requests)
      .then(data => {
        const weatherResponse = data[0].data;
        const imageResponse = data[1].data.results[0];
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
