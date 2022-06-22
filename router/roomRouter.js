const express = require("express");
const router = express.Router();

const User = require("../model/userSchema");
const Room = require("../model/roomSchema");

const verifyUser = require("../middleware/jwtAuth");

// POST
router.get("/allrooms", async (req, res) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json({ status: true, response: allRooms });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/newest/allrooms", async (req, res) => {
  try {
    const allRooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, response: allRooms });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/category/:route", async (req, res) => {
  // console.log(req.params.route);
  let captilizeRoute = req.params.route.charAt(0).toUpperCase() + req.params.route.slice(1)
  try {
    const allRooms = await Room.find({
      $or: [
        {
          city: captilizeRoute,
        },
        {
          category: captilizeRoute,
        },
        {
          type: captilizeRoute,
        },
      ],
    });
    // .sort({ createdAt: -1 });
    res.status(200).json({ status: true, response: allRooms });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/find/:_id", async (req, res) => {
  try {
    let post = await Room.findOne({ _id: req.params._id });
    res.status(200).json({ status: true, response: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/add", async (req, res) => {
  // console.log(req.body);
  try {
    const room = await Room.create(req.body);
    res
      .status(200)
      .json({ status: true, response: "Success: Room added successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/edit", async (req, res) => {
  // console.log(req.body);
  try {
    const room = await Room.updateOne(
      { _id: req.body._id },
      { $set: req.body }
    );
    res.status(200).json({
      status: true,
      response: "Success: Room edited successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/category/:category", async (req, res) => {
  // console.log(req.params.category)
  try {
    let post = await Room.find({ category: req.params.category });
    res.status(200).json({ status: true, response: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/category/newest/:category", async (req, res) => {
  // console.log(req.params.category)
  try {
    let post = await Room.find({ category: req.params.category }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// REVIEW
router.post("/review/add/:_id", verifyUser, async (req, res) => {
  // console.log(req.body)
  try {
    let post = await Room.findByIdAndUpdate(
      req.params._id,
      {
        $push: { reviews: req.body },
      },
      { new: true }
    );
    // console.log(post)

    res
      .status(200)
      .json({ status: true, response: "Success: Review submited successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/review/delete/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id)
  try {
    let post = await Room.updateOne(
      { "reviews._id": req.params._id },
      {
        $pull: { reviews: { _id: req.params._id } },
      },
      { new: true }
    );
    // console.log(post)

    res
      .status(200)
      .json({ status: true, response: "Success: Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// DELETE room
router.delete("/delete/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    let post = await Room.findByIdAndDelete(req.params._id);
    res.status(200).json({
      status: true,
      response: "Success: Room deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.delete("/delete-all", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    await Room.deleteMany();
    res.status(200).json({
      status: true,
      response: "Success: All products deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

module.exports = router;
