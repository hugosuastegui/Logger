const { model, Schema } = require("mongoose");

const poiSchema = new Schema(
  {
    name: String,
    location: String,
    times: [Number],
    weekdays: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    logs: {
      type: Schema.Types.ObjectId,
      ref: "Log",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("PoI", poiSchema);
