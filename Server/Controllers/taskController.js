const taskModel = require("../Models/taskModel");

async function createTask(req, res) {
  try {
    const { title, description, status, priority, due_date } = req.body;
    if (!title || !description || !status || !priority || !due_date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const taskModelObject = new taskModel({
      title,
      description,
      status,
      priority,
      due_date,
      user_id: req.user.id,
    });

    const result = await taskModelObject.save();

    res.status(201).json({ message: "Task added successfully", data: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while adding tasks", error: err.message });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await taskModel.find({ user_id: req.user.id });
    res.status(200).json({ data: tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error while fetching tasks", error: err.message });
  }
}

async function getSingleTask(req, res) {
  try {
    const taskId = req.params.taskid;
    const result = await taskModel.findOne({
      _id: taskId,
      user_id: req.user.id,
    });
    if (!result) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task fetched successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error While Fetching Task", error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = req.params.taskid;

    // Find and update task
    const updatedTask = await taskModel.findOneAndUpdate(
      {
        _id: taskId,
        user_id: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while updating task",
      error: err.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.taskid;

    // Find and delete task
    const deletedTask =
      await taskModel.findOneAndDelete({
        _id: taskId,
        user_id: req.user.id,
      });

    // Task not found
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while deleting task",
      error: err.message,
    });
  }
}

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };
