const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Oauth2 GOOGLE
require('dotenv').config();

var User = require("../../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, mailInfo, done) => {
      // console.log("accessToken: " + accessToken);

      // Check if google profile exist.
      if (mailInfo.id) {
        User.findOne({ googleId: mailInfo.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: mailInfo.id,
              email: mailInfo.emails[0].value,
              name: mailInfo.displayName,
              username: mailInfo.emails[0].value,
              avatar: mailInfo.photos[0].value,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    }
  )
);
