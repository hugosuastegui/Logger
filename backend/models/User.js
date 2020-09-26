const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
    googleId: String,
    facebookId: String,
    collabValidated: {
      type: Boolean,
      default: false,
    },
    nickname: String,
    role: {
      type: String,
      enum: ["employer", "collab"],
    },
    employerTokens: String,
    employerPoIs: [
      {
        type: Schema.Types.ObjectId,
        ref: "PoI",
      },
    ],
    collabLogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Log",
      },
    ],
    collabs: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
