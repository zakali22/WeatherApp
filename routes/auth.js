const passport = require("passport");

module.exports = app => {
  // GOOGLE
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  // FACEBOOK
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
    }
  );

  // LOGOUT
  app.get("/auth/logout", (req, res) => {
    console.log(req.user);
    req.logout();
    res.redirect("/");
  });

  // CURRENTLY SIGNED IN
  app.get("/auth/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
