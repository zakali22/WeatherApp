import React, { Component } from "react";
import { connect } from "react-redux";
// Hot
import SunnyClouds from "../../img/weather/sun-1.svg";
import SunnyRain from "../../img/weather/rain-10.svg";
import Sunny from "../../img/weather/sun.svg";
// Cold
import Cloudy from "../../img/weather/cloud.svg";
import CloudySun from "../../img/weather/cloud-1.svg";
import CloudyRain from "../../img/weather/rain-3.svg";
import Storm from "../../img/weather/storm.svg";
import Snow from "../../img/weather/snowing-1.svg";
import Wind from "../../img/weather/windy.svg";

class WeatherIcon extends Component {
  renderIcon() {
    const temp = this.props.weather.data.tempRange.temp;
    const desc = this.props.weather.data.weather;
    if (temp <= 19) {
      if (desc.includes("few")) {
        return <img src={CloudySun} />;
      } else if (desc.includes("clouds")) {
        return <img src={Cloudy} />;
      } else if (desc.includes("rain")) {
        return <img src={CloudyRain} />;
      } else if (desc.includes("thunderstorm")) {
        return <img src={Storm} />;
      } else if (desc.includes("snow") || desc.includes("sleet")) {
        return <img src={Snow} />;
      } else if (desc.includes("mist") || desc.includes("fog")) {
        return <img src={Wind} />;
      } else {
        return <img src={Sunny} />;
      }
    } else if (temp >= 19 && temp <= 50) {
      if (desc.includes("clouds")) {
        return <img src={Sunny} />;
      } else if (desc.includes("rain")) {
        return <img src={SunnyRain} />;
      } else {
        return <img src={Sunny} />;
      }
    }
  }

  render() {
    return <React.Fragment>{this.renderIcon()}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
};

export default connect(
  mapStateToProps,
  null
)(WeatherIcon);
