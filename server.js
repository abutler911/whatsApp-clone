const express = require("express");
const app = express();
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");
const logoutRouter = require("./routes/logout");
const session = require("express-session");
require("./db/database");
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.urlencoded({ extended: true }));
app.use(registerRouter);
app.use(authRouter);
app.use(chatRouter);
app.use(logoutRouter);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/", (req, res) => {
  const locals = {
    title: "WhatsApp Clone!",
    description: "Welcome to my WhatsApp Clone!",
    header: "Page Header",
  };
  res.render("landing", locals);
});

app.listen(port, () => {
  console.log(`The project is being served on port ${port}`);
});
