import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Pagination } from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import { updateTaskStatus } from "../services/taskService";
import { getAllTasks, deleteTask } from "../services/taskService";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
  });
  const [page, setPage] = useState(1);

  const tasksPerPage = 6;
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      filters.priority
        ? task.priority === filters.priority
        : true;

    const matchesStatus =
      filters.status
        ? task.status === filters.status
        : true;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus
    );
  });
  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );
  const fetchTasks = async () => {    
    setLoading(true);
    const res = await getAllTasks();
    setTasks(res.data.data);   
    setLoading(false);
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
  useEffect(() => {
    setPage(1);
  }, [search, filters]);
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
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >

          {/* LEFT SIDE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              flex: 1,
            }}
          >

            {/* TITLE */}
            <Typography variant="h5">
              All Tasks
            </Typography>

            {/* SEARCH */}
            <TextField
              size="small"
              placeholder="Search by title..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              sx={{
                minWidth: 220,
              }}
            />

          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >

            {/* PRIORITY FILTER */}
            <TextField
              select
              size="small"
              label="Priority"
              value={filters.priority}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priority: e.target.value,
                })
              }
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="low">
                Low
              </MenuItem>

              <MenuItem value="medium">
                Medium
              </MenuItem>

              <MenuItem value="high">
                High
              </MenuItem>
            </TextField>

            {/* STATUS FILTER */}
            <TextField
              select
              size="small"
              label="Status"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="pending">
                Pending
              </MenuItem>

              <MenuItem value="completed">
                Completed
              </MenuItem>
            </TextField>

            {/* ADD BUTTON */}
            <Button
              variant="contained"
              onClick={() => {
                setSelectedTask(null);
                setOpen(true);
              }}
            >
              + Add Task
            </Button>

          </Box>

        </Box>

        {/* TASK GRID */}
        <Grid container spacing={2}>
          {paginatedTasks.length > 0 ? paginatedTasks.map((task) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={task._id}>
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
        {/* PAGINATION */}
        <Box
          sx={{
            display: "flex",
            mt: 4,
            mb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) =>
              setPage(value)
            }
            color="primary"
            shape="rounded"
          />
        </Box>
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