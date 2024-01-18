// db/mongoose.js
const mongoose = require("mongoose");

const connectionURL = process.env.MONGO_DB_URI;

mongoose
  .connect(connectionURL, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
