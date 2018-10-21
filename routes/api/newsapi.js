const keys = require("../../config/keys");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(keys.newsID);

module.exports = app => {
  // GET ALL NEWS
  app.get("/api/latest-news", (req, res) => {
    newsapi.v2
      .topHeadlines({
        language: "en",
        pageSize: 100
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (
            article.content &&
            article.source !== "cnn" &&
            article.source !== "The Jerusalem Post" &&
            article.urlToImage
          ) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content.substring(0, article.content.length - 13)
            };
            console.log(articleID);
            articles.push(articleID);
          }
        });
        res.send(articles);
      });
  });

  // GET BY CATEGORY
  app.get("/api/latest-news/:category", (req, res) => {
    const category = req.params.category;
    newsapi.v2
      .topHeadlines({
        category: category,
        language: "en",
        country: "us"
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (
            article.content &&
            article.source !== "cnn" &&
            article.source !== "The Jerusalem Post" &&
            article.urlToImage
          ) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content.substring(0, article.content.length - 13)
            };
            articles.push(articleID);
          }
        });
        res.send(articles);
      });
  });

  // SEARCH A TOPIC
  app.post("/api/search-news/:pageNumber", (req, res) => {
    const searchTerm = req.body.searchTerm;
    newsapi.v2
      .everything({
        q: req.body.searchTerm,
        language: "en",
        sortBy: "relevancy",
        page: req.params.pageNumber
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (
            article.content &&
            article.source !== "cnn" &&
            article.source !== "The Jerusalem Post" &&
            article.urlToImage
          ) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content.substring(0, article.content.length - 13)
            };
            articles.push(articleID);
          }
        });
        console.log(articles);
        res.send(articles);
      });
  });
};
