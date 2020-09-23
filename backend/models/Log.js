const { model, Schema } = require("mongoose");

const logSchema = new Schema(
  {
    location: String,
    time: Number,
    weekdays: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Log", logSchema);
