const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    city: {
      type: String,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    image: {
      type: Array,
    },
    date: {
      type: String,
    },
    service: {
      type: Object,
    },
    reviews: [
      {
        profilePic: String,
        name: String,
        rating: Number,
        comment: String,
        date: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      }
    ]
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
