import React from "react";
import PropTypes from "prop-types";
import Crying from "../../img/boy-face-weep.svg";

const NotFound = props => {
  return (
    <div className="NotFound">
      <div className="container">
        <span className="NotFound__text">
          <h1>404</h1>
          <h3>Sorry, but you&#39;re definitely lost. Don&#39;t cry</h3>
        </span>
        <img className="NotFound__image" src={Crying} alt="Crying Image" />
      </div>
    </div>
  );
};

export default NotFound;
