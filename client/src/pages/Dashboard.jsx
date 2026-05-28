import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
} from "@mui/material";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import { updateTaskStatus } from "../services/taskService";
import { getAllTasks, deleteTask } from "../services/taskService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const fetchTasks = async () => {
    const res = await getAllTasks();
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleStatusChange = async (task) => {
    try {
      await updateTaskStatus(task._id);
      toast.success("Task status updated");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 3 }}>

        {/* HEADER ROW */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">
            All Tasks
          </Typography>

          <Button
            variant="contained"

            onClick={() => {
              setSelectedTask(null);
              setOpen(true)
            }}
          >
            + Add Task
          </Button>
        </Box>

        {/* TASK GRID */}
        <Grid container spacing={2}>
          {tasks.length > 0 ? tasks.map((task) => (
            <Grid size={{ xs: 12, sm: 6, md: 3, lg: 4 }} key={task._id}>
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onStatusChange={handleStatusChange}
              />
            </Grid>
          )) :
            (
              <Typography sx={{ textAlign: "center", width: "100%", color: "red" }}>No Tasks Found!!</Typography>
            )
          }
        </Grid>

        {/* MODAL FORM */}
        <TaskForm
          open={open}
          setOpen={setOpen}
          refresh={fetchTasks}
          selectedTask={selectedTask}
        />

      </Container>
    </>
  );
};

export default Dashboard;