const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB Connection Successful!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
