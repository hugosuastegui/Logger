// const User = require('../models/User');
// const passport = require('passport');

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// module.exports = passport;

const passport = require("passport");

require("./serializers");
require("./localStrategy");
require("./googleStrategy");

// module.exports = (app) => {
//   app.use(passport.initialize());
//   app.use(passport.session());
// };
module.exports = passport;
