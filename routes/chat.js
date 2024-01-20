const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
  if (req.session.user) {
    res.render("chat", { title: "Chat", user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
