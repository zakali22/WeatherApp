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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
