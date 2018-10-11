const keys = require("../../config/keys");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(keys.newsID);

module.exports = app => {
  // GET ALL NEWS
  app.get("/api/latest-news", (req, res) => {
    newsapi.v2
      .topHeadlines({
        language: "en"
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (article.content) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content
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
    newsapi.v2
      .topHeadlines({
        category: req.params.category,
        language: "en",
        country: "us"
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (article.content) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content
            };
            console.log(articleID);
            articles.push(articleID);
          }
        });
        res.send(articles);
      });
  });

  // SEARCH A TOPIC
  app.get("/api/search-news/:search/:page", (req, res) => {
    newsapi.v2
      .everything({
        q: req.params.search,
        language: "en",
        sortBy: "relevancy",
        page: req.params.page
      })
      .then(response => {
        const data = response.articles;
        const articles = [];
        data.map(article => {
          if (article.content) {
            const articleID = {
              source: article.source.name,
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content
            };
            console.log(articleID);
            articles.push(articleID);
          }
        });
        res.send(articles);
      });
  });
};
