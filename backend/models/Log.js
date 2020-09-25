const { model, Schema, SchemaType } = require("mongoose");

const logSchema = new Schema(
  {
    location: String,
    checkinTime: Number,
    weekdays: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    valid: {
      type: Boolean,
      default: true,
    },
    poi: {
      type: Schema.Types.ObjectId,
      ref: "Poi",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Log", logSchema);
