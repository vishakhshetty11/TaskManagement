const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Za-z]+$/,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Za-z]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[6-9][0-9]{9}$/,
    },
    role: {
      type: String,
      default: "user", // can extend later (superadmin, editor)
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
