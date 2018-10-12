import React, { Component } from "react";
import Logo from "../../img/Logo.svg";
// import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={Logo} className="header__logo" alt="Logo" />
        <nav className="header__nav">
          <a href={"#"} className="header__nav--link">
            <div className="header__nav--item">weather</div>
          </a>
          <a href={"#"} className="header__nav--link">
            <div className="header__nav--item">news</div>
          </a>
        </nav>
      </div>
    );
  }
}

export default Header;
