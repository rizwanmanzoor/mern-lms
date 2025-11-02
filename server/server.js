require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;

// cors
cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// middlewares
app.use(express.json());

// database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("Database is connected!"))
  .catch(e => console.error("Database is not connected!", e)
  )

// routes



// global error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Something went wrong"
  })
})

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})