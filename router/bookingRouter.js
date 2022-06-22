const express = require("express");
const router = express.Router();

const Booking = require("../model/bookingSchema");

const verifyUser = require("../middleware/jwtAuth");

// ADMIN
router.get("/allbookings", async (req, res) => {
  try {
    let allBookings = await Booking.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: allBookings });
  } catch (error) {
    res.status(400).json({ status: false, response: error });
  }
});


// CUSTOMER
router.get("/my-bookings", verifyUser, async (req, res) => {
  try {
    let myOrders = await Booking.find({ customerID: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: myOrders });
  } catch (error) {
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/book", async (req, res) => {
  // console.log(req.body)
  try {
     await Booking.create(req.body);
    res
      .status(200)
      .json({ status: true, response: "Success: Booking placed successfully." });
  } catch (error) {
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/cancel", verifyUser, async (req, res) => {
  // console.log(req.body._id);
  try {
    await Booking.findByIdAndUpdate(
      req.body._id,
      {
        $set: { status: "Canceled" },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      response: "Success: Booking canceled successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/delete/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    await Booking.findByIdAndDelete(req.params._id);
    res.status(200).json({
      status: true,
      response: "Success: Booking deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/delete-all", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    await Booking.deleteMany();
    res.status(200).json({
      status: true,
      response: "Success: All orders deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

module.exports = router;
