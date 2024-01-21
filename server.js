// Import required modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();
require("./db/database"); // Database connection

// Routers
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");
const logoutRouter = require("./routes/logout");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Set up middlewares
app.use(express.static("public")); // Serve static files
app.set("view engine", "ejs"); // Set view engine to EJS
app.use(expressLayouts); // Use express-ejs-layouts
app.set("layout", "layouts/main"); // Set the default layout
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

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

// Landing page route
app.get("/", (req, res) => {
  const locals = {
    title: "WhatsApp Clone!",
    description: "Welcome to my WhatsApp Clone!",
    header: "Page Header",
  };
  res.render("landing", locals);
});

// Start the server
app.listen(port, () => {
  console.log(`The project is being served on port ${port}`);
});
