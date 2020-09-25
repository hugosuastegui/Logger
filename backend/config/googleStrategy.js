const User = require("../models/User");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleConfig = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CBURL,
  profileFields: ["id", "email", "link", "name", "photos"],
};

passport.use(
  new GoogleStrategy(googleConfig, async (_, __, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const user = await User.create({
        email: profile.emails[0].value,
        name: profile.displayName,
        googleId: profile.id,
        photo: profile.photos[0].value,
        role: "collab",
      });
      return done(null, user);
    }
    return done(null, user);
  })
);
