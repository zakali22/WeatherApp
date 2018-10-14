import React, { Component } from "react";
import Header from "../Navigation/Header";

class News extends Component {
  render() {
    return (
      <div className="news">
        <Header className="header header--news" />
      </div>
    );
  }
}

export default News;
