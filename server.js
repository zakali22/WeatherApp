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

// Mongoose connection
const url = keys.mongo_uri;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

// bodyParser + cookieParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Messages
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  res.locals.user = req.user || null;
  next();
});

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      const namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Cookie Sessions
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
    keys: [keys.cookieKey]
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

/*---Mongoose--Collection*/
require("./models/Users"); // Create the User model first. Everything after can then access it
require("./services/passport");

// Routes
require("./routes/auth")(app);
require("./routes/api/weatherapi")(app);
require("./routes/api/newsapi")(app);

// Other files
require("./misc");

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
