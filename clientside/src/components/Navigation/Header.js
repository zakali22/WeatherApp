import React, { Component } from "react";
import Logo from "../../img/Logo.svg";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";

class Header extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <Link to="/">
          <img src={Logo} className="header__logo" alt="Logo" />
        </Link>
        <Menu className="header__nav" right width={"200px"}>
          <Link to={"/weather"} className="header__nav--link">
            <div className="header__nav--item">weather</div>
          </Link>
          <Link to={"/news"} className="header__nav--link">
            <div className="header__nav--item">news</div>
          </Link>
        </Menu>
      </div>
    );
  }
}

export default Header;
