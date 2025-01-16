// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//       callbackURL: "http://localhost:5173",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );
