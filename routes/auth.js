// routes/auth.js or routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Unable to login");
    }

    res.send("Login successful");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
