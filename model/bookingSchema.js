const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    customerID: {
      type: String,
    },
    customerDetails: {
      type: Object,
    },
    room: {
      type: Array,
    },
    stay: {
      type: Object,
    },
    guest: {
      type: Object,
    },
    totalNights: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    paymentType: {
      type: String,
    },
    status: {
      type: String,
      default: "Room reserved",
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
