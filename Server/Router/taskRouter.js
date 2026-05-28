const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../Controllers/taskController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/createTask", authMiddleware, createTask);

router.get("/getAllTasks", authMiddleware, getAllTasks);

router.get("/getSingleTask/:taskid", authMiddleware, getSingleTask);

router.put("/updateTask/:taskid", authMiddleware, updateTask);

router.put("/updateTaskStatus/:taskid", authMiddleware, updateTaskStatus);

router.delete("/deleteTask/:taskid", authMiddleware, deleteTask);

module.exports = router;
