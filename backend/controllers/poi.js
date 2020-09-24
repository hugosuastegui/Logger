const Poi = require("../models/PoI");

exports.getPois = async (req, res) => {
  const pois = await Poi.find();
  res.status(200).json({ pois });
};

exports.getPoi = async (req, res) => {
  const { poiId } = req.params;
  const poi = await Poi.findById(poiId).populate("logs");
  res.status(200).json({ poi });
};

exports.createPoi = async (req, res) => {
  const { name, location, checkinTimes, checkoutTimes, weekdays } = req.body;
  const poi = await Poi.create({
    name,
    location,
    checkinTimes,
    checkoutTimes,
    weekdays,
    employer: req.user.id,
  });
  res.status(200).json({ poi });
};

exports.updatePoi = async (req, res) => {
  const poiId = req.params.poiId;
  const { name, location, checkinTimes, checkoutTimes, weekdays } = req.body;
  const poi = await Poi.findByIdAndUpdate(
    poiId,
    {
      name,
      location,
      checkinTimes,
      checkoutTimes,
      weekdays,
    },
    { new: true }
  );
  res.status(200).json({ poi });
};

exports.deletePoi = async (req, res) => {
  const { poiId } = req.params;
  await Poi.findByIdAndRemove(poiId);
  res.status(200).json({ message: "deleted Poi" });
};
