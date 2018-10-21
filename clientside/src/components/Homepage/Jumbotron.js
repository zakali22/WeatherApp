import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Header from "../Navigation/Header";

class Jumbotron extends Component {
  render() {
    return (
      <div className="homepage">
        <Header className="header" />
        <div className="container">
          <h1>
            An all-in-one personalized <span>weather & news</span> web app
          </h1>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
