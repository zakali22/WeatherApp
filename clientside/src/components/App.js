import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Jumbotron from "./Homepage/Jumbotron";
import Weather from "./Weather/Weather";

import { connect } from "react-redux";
import * as actions from "../actions/weatherActions";

class App extends Component {
  componentDidMount() {
    if (!this.props.weather.data) {
      this.props.getWeather();
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Jumbotron} />
            <Route exact path="/weather" component={Weather} />
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
