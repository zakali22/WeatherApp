import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Jumbotron from "./Homepage/Jumbotron";
import Weather from "./Weather/Weather";
import News from "./News/News";
import NotFound from "./Error/NotFound";

import { connect } from "react-redux";
import { getWeather } from "../actions/weatherActions";
import { getLatest } from "../actions/newsActions";

const actions = {
  getWeather,
  getLatest
};

class App extends Component {
  componentDidMount() {
    if (!this.props.weather) {
      this.props.getWeather();
    }

    if (!this.props.news) {
      this.props.getLatest();
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Jumbotron} />
            <Route exact path="/weather" component={Weather} />
            <Route exact path="/news" component={News} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
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
)(App);
