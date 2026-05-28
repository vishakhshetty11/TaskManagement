const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const userRouter = require("./Router/userRouter");
const taskRouter = require("./Router/taskRouter");
require("dotenv").config();
server.use(express.json());
server.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://your-frontend-app-name.onrender.com", 
    ],
    credentials: true,
  }),
);

server.use("/api/v1/user/", userRouter);

server.use("/api/v1/tasks/", taskRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log("Server is running on Port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database", err.message);
  });
