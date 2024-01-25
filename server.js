// Import required modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();
require("./db/database");
const Message = require("./models/Message");
const Room = require("./models/Room");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Routers
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");
const logoutRouter = require("./routes/logout");
const roomsRouter = require("./routes/rooms");

// Set up middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use(registerRouter);
app.use(authRouter);
app.use(chatRouter);
app.use(logoutRouter);
app.use("/", roomsRouter);

io.on("connection", (socket) => {
  console.log("New websocket connection");

  // Joining a room
  socket.on("joinRoom", async ({ roomId, userId }) => {
    socket.join(roomId);
    // Fetch room details if needed
    // ...

    socket.broadcast
      .to(roomId)
      .emit("message", "A user has joined the chat...");
  });

  // Handling messages in a room
  socket.on("sendMessage", async (data) => {
    console.log(`Received message data: `, data);
    try {
      const message = new Message({
        content: data.message,
        sender: data.userId,
        chat: data.chatId,
      });
      await message.save();
      io.to(data.chatId).emit("receiveMessage", data); // Emit to specific room
    } catch (error) {
      console.error("Error saving message: ", error);
    }
  });

  socket.on("disconnect", () => {
    io.emit("message", `${username} has left the chat...`);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("userTyping", data);
  });
});

// Landing page route
app.get("/", (req, res) => {
  const locals = {
    title: "ChatSphere",
    description: "Welcome to ChatSphere!",
    header: "Page Header",
  };
  res.render("landing", locals);
});

// Start the server
server.listen(port, () => {
  console.log(`The project is being served on port ${port}...`);
});
