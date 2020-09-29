const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../config/passport");
const bcrypt = require("bcrypt");

const bcryptSalt = 10;

router.post("/signup", async (req, res, next) => {
  const role = req.body.role === "true" ? "employer" : "collab";
  const email = req.body.email;
  const password = req.body.password;
  const repeatedPassword = req.body.repeatedPassword;

  if (email === "" || password === "") {
    res.status(401).json({ message: "Indicate email and password" });
    return;
  }

  if (repeatedPassword != password) {
    res.status(401).json({ message: "Passwords don't match" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(401).json({ message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      role,
    });

    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "success on signup" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.get("/profile", isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) =>
      res.status(500).json({ message: `Error ocurred in get/profile: ${err}` })
    );
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

// ============== GOOGLE =================

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", { scope: ["email"] }, (err, user, info) => {
    if (err) return res.status(500).json({ err, info });
    if (!user) return res.status(401).json({ err, info });

    req.login(user, (error) => {
      if (error) return res.status(401).json({ error });
      return res.redirect(process.env.FRONTENDPOINT + "/");
    });
  })(req, res, next);
});

module.exports = router;
