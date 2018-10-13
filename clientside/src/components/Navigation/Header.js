import React, { Component } from "react";
import Logo from "../../img/Logo.svg";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <Link to="/">
          <img src={Logo} className="header__logo" alt="Logo" />
        </Link>
        <nav className="header__nav">
          <Link to={"/weather"} className="header__nav--link">
            <div className="header__nav--item">weather</div>
          </Link>
          <Link to={"#"} className="header__nav--link">
            <div className="header__nav--item">news</div>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
