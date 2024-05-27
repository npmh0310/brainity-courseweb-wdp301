const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./key');
// Oauth2 GOOGLE


var User = require('../../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
        done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, done, mailInfo) => {
  
        console.log("come")
        console.log("profile: " + accessToken)
        console.log("done: " + done)
        console.log(mailInfo)

      // Check if google profile exist.
      // if (profile.id) {
  
      //   User.findOne({googleId: profile.id})
      //     .then((existingUser) => {
      //       if (existingUser) {
      //           console.log("existing user!")
      //         done(null, existingUser);
      //       } else {
      //           console.log("new user created! ", profile.name.familyName + " " + profile.name.givenName)
      //         new User({
      //           googleId: profile.id,
      //           email: profile.emails[0].value,
      //           name: profile.name.familyName + ' ' + profile.name.givenName
      //         })
      //           .save()
      //           .then(user => done(null, user));
      //       }
      //     })
      // }
    })
  );