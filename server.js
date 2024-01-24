// Import required modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();
require("./db/database"); // Database connection

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

// Socket.IO connection handling
io.on("connection", (socket) => {
  const username = socket.handshake.query.username || "Anonymous";

  console.log("New websocket connection from: " + username);

  socket.broadcast.emit("message", `${username} has joined the chat...`);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    io.emit("message", `${username} has left the chat...`);
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
