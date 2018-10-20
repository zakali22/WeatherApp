const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieSession = require("cookie-session");
const session = require("express-session");
const expressValidator = require("express-validator");
const passport = require("passport");

const keys = require("./config/keys");

// Header 'Allow-origin'
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// bodyParser + cookieParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
require("./routes/api/weatherapi")(app);
require("./routes/api/newsapi")(app);

// Other files
require("./misc");

process.env.PWD = process.cwd();

// Conditional Production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("clientside/build"));
  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/weather", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/news", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
  app.get("/news/*", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "clientside", "build", "index.html")
    );
  });
}

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
