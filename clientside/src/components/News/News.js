import React, { Component } from "react";
import HeaderNews from "../Navigation/HeaderNews";
import { connect } from "react-redux";
import { getLatestCategory } from "../../actions/newsActions";

const actions = {
  getLatestCategory
};

class News extends Component {
  state = {
    news: this.props.news.data,
    pageNumber: 1,
    listItem: ""
  };
  static nav_list = [
    "general",
    "technology",
    "entertainment",
    "science",
    "business"
  ];

  latestCategory = list => {
    this.setState({
      listItem: list
    });
    this.props.getLatestCategory(list, this.state.pageNumber);
  };

  loadMore = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
    this.props.getLatestCategory(this.state.listItem, this.state.pageNumber);
  };

  componentDidUpdate() {
    this.renderOnData();
  }

  renderOnData() {
    if (this.props.news) {
      return (
        <div className="news">
          <HeaderNews className="header header--news" />
          <div className="container">
            <nav className="news__nav">
              <ul className="news__nav__list">
                {News.nav_list.map(list => {
                  return (
                    <li
                      onClick={this.latestCategory.bind(this, list)}
                      className="news__nav__list--item"
                    >
                      {list}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="news__articles">
              <div className="news__articles--container">
                {" "}
                {this.props.news.data.map(article => {
                  return (
                    <div className="news__articles--item">
                      <a href={article.url}>
                        <img src={article.urlImage} />
                        <p>{article.source}</p>
                        <h1>{article.title}</h1>
                        <p className="news__articles--author">
                          by{" "}
                          {article.author === null || article.author === ""
                            ? article.source
                            : article.author}
                        </p>
                        <p className="news__articles--content">
                          {article.content}
                        </p>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="load-more">
              <span onClick={this.loadMore}>Load more</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.renderOnData()}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  };
};

export default connect(
  mapStateToProps,
  actions
)(News);
