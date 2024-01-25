const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/roomsList", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const rooms = await Room.find({}); // Fetch all rooms
    res.render("roomsList", {
      title: "RoomsList",
      description: "Available Rooms",
      header: "Page Header",
      rooms: rooms,
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).send("Error loading rooms");
  }
});

router.post("/create-room", async (req, res) => {
  try {
    const { roomName } = req.body;
    const newRoom = new Room({ name: roomName });
    await newRoom.save();
    // Redirect to the rooms list page to see the updated list
    res.redirect("/roomsList");
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).send("Error creating room");
  }
});

router.post("/delete-room/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    // Add additional checks if needed to confirm user is authorized to delete the room
    await Room.findByIdAndDelete(roomId);
    res.redirect("/roomsList");
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).send("Error deleting room");
  }
});

// Additional routes for creating, joining, and deleting rooms can go here

module.exports = router;
