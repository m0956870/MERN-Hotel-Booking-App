const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: String,
    },
    address: {
      type: Object,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
