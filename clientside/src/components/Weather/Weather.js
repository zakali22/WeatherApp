import React, { Component } from "react";
import HeaderWeather from "../Navigation/HeaderWeather";
import WeatherIcon from "./WeatherIcon";
import WeatherIconForecast from "./WeatherIconForecast";
import { connect } from "react-redux";
import * as actions from "../../actions/weatherActions";

class Weather extends Component {
  state = {
    weather: this.props.weather
  };

  renderOnData() {
    if (this.state.weather) {
      return (
        <div className="weather">
          <HeaderWeather className="header header--overall" />
          <div className="container">
            <span className="weather--location">
              <div className="weather--location-container">
                <h1>
                  {this.props.weather.data.location.city},
                  {this.props.weather.data.location.country}
                </h1>
              </div>
            </span>
          </div>
          <div className="weather--data">
            <div className="weather--data__today">
              <div className="today--weather">
                <h1>
                  {Math.round(this.props.weather.data.tempRange.temp)}{" "}
                  <span>&deg;</span>
                </h1>
                <h2>{this.props.weather.data.weather}</h2>
              </div>
              <div className="today--logo">
                <WeatherIcon />
              </div>
            </div>
            <div className="weather--data__forecast">
              {this.props.weather.data.forecasts.map(forecast => {
                return (
                  <div className="forecast--container">
                    <h4>{forecast.date}</h4>
                    <div className="forecast--logo">
                      <WeatherIconForecast
                        temp={forecast.temperature.temp}
                        description={forecast.weather}
                      />
                    </div>
                    <div className="forecast--data">
                      <p>
                        {forecast.temperature.temp_min} <span>&deg;</span>
                      </p>
                      <p>
                        {forecast.temperature.temp_max} <span>&deg;</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <React.Fragment>{this.renderOnData()}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
};

export default connect(
  mapStateToProps,
  actions
)(Weather);
