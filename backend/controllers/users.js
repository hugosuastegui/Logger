const Poi = require("../models/PoI");
const User = require("../models/User");
const Log = require("../models/Log");

exports.getInfo = async (req, res, next) => {
  await User.findById(req.user._id)
    .populate("employerPoIs")
    .populate("collabLogs")
    .populate("collabs")
    .populate("employer")
    .then((user) => res.status(200).json({ user }))
    .catch((err) =>
      res.status(500).json({ message: `Error ocurred in get/profile: ${err}` })
    );
};
exports.getEmployers = async (req, res, next) => {
  await User.find({ role: "employer" })
    .populate("employerPoIs")
    .populate("collabLogs")
    .populate("collabs")
    .populate("employer")
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

exports.requestEmployer = async (req, res, next) => {
  const { employerId } = req.params;
  const employer = await User.findById(employerId);
  if (typeof employer !== undefined) {
    const collabs = await User.findByIdAndUpdate(req.user.id, {
      $push: { employer },
    });
    await User.findByIdAndUpdate(employerId, { $push: { collabs } });
    res.status(200).json({ message: "Please wait to be validated" });
  } else {
    res.status(200).json({ message: `Couldn't find user` });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .populate("employerPoIs")
    .populate("collabLogs")
    .populate("collabs")
    .populate("employer");

  if (typeof req.body.email !== "undefined") {
    user.email = req.body.email;
  }
  if (typeof req.body.name !== "undefined") {
    user.name = req.body.name;
  }
  if (typeof req.body.password !== "undefined") {
    user.password = req.body.password;
  }
  if (typeof req.body.photo !== "undefined") {
    user.photo = req.body.photo;
  }
  if (typeof req.body.collabValidated !== "undefined") {
    user.collabValidated = req.body.collabValidated;
  }
  if (typeof req.body.nickname !== "undefined") {
    user.nickname = req.body.nickname;
  }
  if (typeof req.body.role !== "undefined") {
    user.role = req.body.role;
  }
  if (typeof req.body.collabs !== "undefined") {
    user.collabs = req.body.collabs;
  }

  user.save();
  console.log(user);

  res.status(200).json({ user });
};
