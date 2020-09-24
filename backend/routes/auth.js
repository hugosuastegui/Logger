const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
  const role = req.body.role ? "employer" : "collab";
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
        res.status(200).json({ message: "ok" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      console.log(failureDetails);
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.get("/currentuser", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/brief", isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

router.put("/photo", async (req, res) => {
  const { photo } = req.body;
  await User.findByIdAndUpdate(req.user.id, { photo });
  res.status(200).json({ message: "ok" });
});

function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

module.exports = router;
