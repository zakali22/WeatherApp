import React, { Component } from "react";
import Logo from "../../img/Logo.svg";
import { Link } from "react-router-dom";
import SearchIcon from "../../img/search.svg";
import { stack as Menu } from "react-burger-menu";

import { connect } from "react-redux";
import * as actions from "../../actions/newsActions";

class HeaderNews extends Component {
  state = {
    search: ""
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchNews(this.state.search, 1);
  };
  render() {
    return (
      <div className={this.props.className}>
        <Link to="/">
          <img src={Logo} className="header__logo" alt="Logo" />
        </Link>
        <div className="header__searchContainer">
          {/* Don't forget to change to ReactForm */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="searchString"
              className="header__searchContainer--input"
              placeholder="Search a topic"
              autoComplete="off"
              onChange={this.handleChange}
              value={this.state.search}
            />

            <button type="submit" onClick={this.handleSubmit}>
              <img
                src={SearchIcon}
                className="header__searchContainer--searchIcon"
              />
            </button>
          </form>
        </div>
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

export default connect(
  null,
  actions
)(HeaderNews);
