import { TextField, Grid, MenuItem, Button, Box, Dialog, DialogTitle, DialogContent, } from "@mui/material";
import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService";

import { toast } from "react-toastify";

const TaskForm = ({
  open,
  setOpen,
  refresh,
  selectedTask,
}) => {
  const [form, setForm] = useState({
    title: "",
    priority: "",
    due_date: "",
    description: "",
  });

  // PREFILL FORM ON EDIT
  useEffect(() => {
    if (selectedTask) {
      
      setForm({
        title: selectedTask.title || "",
        priority: selectedTask.priority || "",
        due_date: selectedTask.due_date?.split("T")[0] || "",
        description: selectedTask.description || "",
      });
    } else {
      setForm({
        title: "",
        priority: "",
        due_date: "",
        description: "",
      });
    }
  }, [selectedTask]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // CLOSE MODAL
  const handleClose = () => {
    setOpen(false);
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      const a = 1;
      // UPDATE
      if (selectedTask) {
        console.log(selectedTask._id, form)
        await updateTask(selectedTask._id, form);

        toast.success("Task updated");
      }

      // CREATE
      else {
        await createTask(form);

        toast.success("Task created");
      }

      setOpen(false);

      refresh();

      // RESET FORM
      setForm({
        title: "",
        priority: "",
        due_date: "",
        description: "",
      });

    } catch (err) {
      
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      {/* TITLE */}
      <DialogTitle>
        {selectedTask ? "Edit Task" : "Create Task"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>

          {/* TITLE - FULL WIDTH */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Task Title"
              name="title"
              value={form.title}
              onChange={handleChange} sx={{ mt: 1 }}
            />
          </Grid>

          {/* PRIORITY + DUE DATE */}
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select
              fullWidth
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <TextField
              fullWidth
              type="date"
              name="due_date"
              label="Due Date"
              value={form.due_date}
              onChange={handleChange}
              sx={{
                "& .MuiInputLabel-root": {
                  width: "100%",
                  backgroundColor: "#fff",
                  px: 0.5,
                },
              }}
            />
          </Grid>

          {/* DESCRIPTION - FULL WIDTH */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>

        </Grid>

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            {selectedTask ? "Update Task" : "Create Task"}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;

