const Poi = require("../models/PoI");
const User = require("../models/User");
const Log = require("../models/Log");

exports.getInfo = async (req, res, next) => {
  await User.findById(req.user.id)
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
    await User.findByIdAndUpdate(req.user.id, { $push: { employer } });
    res.status(200).json({ message: "Please wait to be validated" });
  } else {
    res.status(200).json({ message: `Couldn't find user` });
  }
};

// router.get("/info", isAuth, (req, res, next) => {
//   User.findById(req.user.id)
//     .populate("employerPoIs")
//     .populate("collabLogs")
//     .populate("collabs")
//     .populate("employer")
//     .then((user) => res.status(200).json({ user }))
//     .catch((err) =>
//       res.status(500).json({ message: `Error ocurred in get/profile: ${err}` })
//     );
// });

// router.get("/employers", isAuth, (req, res, next) => {
//   User.find({ role: "employer" })
//     .populate("employerPoIs")
//     .populate("collabLogs")
//     .populate("collabs")
//     .populate("employer")
//     .then((user) => res.status(200).json({ user }))
//     .catch((err) => res.status(500).json({ err }));
// });
