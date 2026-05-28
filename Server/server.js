const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const userRouter = require('./Router/userRouter')
const taskRouter = require('./Router/taskRouter')
require("dotenv").config();
server.use(express.json());
server.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));


server.use("/api/v1/user/", userRouter);

server.use("/api/v1/tasks/", taskRouter);

mongoose
  .connect(`${process.env.url}/${process.env.database}`)
  .then(() => {
    console.log("Connected to the database");
    server.listen(process.env.port, () => {
      console.log("Server is running on Port " + process.env.port);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database", err.message);
  });
