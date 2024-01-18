// app.js or routes/user.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
