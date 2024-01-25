const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/chat", async (req, res) => {
  if (req.session.user) {
    try {
      const userId = req.session.user._id;
      const currentChatId = req.session.currentChatId;

      const messages = await Message.find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .populate("sender")
        .exec();
      console.log(
        `UserId: ${req.session.user._id}, ChatId: someChatIdVariable`
      );
      res.render("chat", {
        title: "Chat",
        user: req.session.user,
        userId: req.session.user._id,
        currentChatId: currentChatId,
        messages: messages.reverse(),
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).send("Error loading chat");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
