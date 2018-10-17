import React, { Component } from "react";
import Logo from "../../img/Logo.svg";
import { Link } from "react-router-dom";
import SearchIcon from "../../img/search.svg";

class HeaderWeather extends Component {
  state = {
    search: ""
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };
  render() {
    return (
      <div className={this.props.className}>
        <Link to="/">
          <img src={Logo} className="header__logo" alt="Logo" />
        </Link>
        <div className="header__searchContainer">
          {/* Don't forget to change to ReactForm */}
          <form>
            <input
              type="text"
              name="searchString"
              className="header__searchContainer--input"
              placeholder="Search a weather"
              autoComplete="off"
              onChange={this.handleChange}
              value={this.state.search}
            />
            <Link to={`/search/${this.state.search}`}>
              <button type="submit">
                <img
                  src={SearchIcon}
                  className="header__searchContainer--searchIcon"
                />
              </button>
            </Link>
          </form>
        </div>
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

export default HeaderWeather;
