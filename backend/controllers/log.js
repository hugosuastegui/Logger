const Log = require("../models/Log");
const Poi = require("../models/PoI");

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
    valid: checkinTime < poi.checkinTime + poi.tolerance ? true : false,
  });
  res.status(200).json({ log });
};

exports.deleteLog = async (req, res) => {
  const { logId } = req.params;
  await Log.findByIdAndRemove(logId);
  res.status(200).json({ message: "Log Deleted" });
};
