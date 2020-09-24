const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    photo: String,
    googleId: String,
    facebookId: String,
    collabValidated: {
      type: Boolean,
      defaut: false,
    },
    nickname: String,
    role: {
      type: String,
      enum: ["employer", "collab"],
    },
    employerToker: String,
    employerPoI: {
      type: Schema.Types.ObjectId,
      ref: "PoI",
    },
    collabLogs: {
      type: Schema.Types.ObjectId,
      ref: "Logs",
    },
    collabs: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
