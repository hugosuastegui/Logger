const Log = require("../models/Log");
const Poi = require("../models/PoI");
const User = require("../models/User");

exports.getLogs = async (req, res) => {
  const userId = req.user.id;
  const logs = await Log.find({ user: userId });
  res.status(200).json({ logs });
};

exports.getLog = async (req, res) => {
  const { logId } = req.params;
  const log = await Log.findById(logId);
  res.status(200).json({ log });
};

exports.createLog = async (req, res) => {
  const { poiId } = req.params;
  const poi = Poi.findById(poiId);
  const { location, checkinTime, tolerance, weekdays } = req.body;
  const log = await Log.create({
    location,
    checkinTime,
    tolerance,
    weekdays,
    poi: poiId,
    user: req.user.id,
    valid: checkinTime < poi.checkinTime + poi.tolerance ? true : false,
  });

  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: { collabLogs: log },
  });

  res.status(200).json({ log, user });
};

exports.deleteLog = async (req, res) => {
  const { logId } = req.params;
  await Log.findByIdAndRemove(logId);
  res.status(200).json({ message: "Log Deleted" });
};
