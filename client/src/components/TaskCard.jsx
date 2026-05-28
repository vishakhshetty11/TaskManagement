import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const shortDesc =
    task.description?.length > 80
      ? task.description.substring(0, 80) + "..."
      : task.description;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {task.title}
          </Typography>

          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            mb: 1,
          }}
        >

          {/* DUE DATE */}
          <Typography
            variant="caption"
            sx={{
              color: "gray",
              fontWeight: 500,
            }}
          >
            Due: {new Date(task.due_date).toLocaleDateString()}
          </Typography>

          {/* PRIORITY */}
          <Typography
            variant="caption"
            sx={{
              px: 1.2,
              py: 0.4,
              borderRadius: 2,
              textTransform: "capitalize",
              fontWeight: 600,
              backgroundColor:
                task.priority === "high"
                  ? "#ffebee"
                  : task.priority === "medium"
                    ? "#fff8e1"
                    : "#e8eef5",

              color:
                task.priority === "high"
                  ? "#d32f2f"
                  : task.priority === "medium"
                    ? "#ed6c02"
                    : "#0073ed",
            }}
          >
            {task.priority}
          </Typography>
        </Box>
        {/* DESCRIPTION */}
        <Typography variant="body2" sx={{ mt: 1, color: "gray", minHeight: "50px" }}>
          {expanded ? task.description : shortDesc}
          {task.description?.length > 80 && (
            <Typography
              variant="caption"
              sx={{
                color: "#1976d2",
                cursor: "pointer",
                mt: 1,
                display: "inline-block",
                ml: 1
              }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? " Show less" : " Read more"}
            </Typography>
          )}
        </Typography>

        {/* READ MORE */}


        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 0,
          }}
        >
          {/* STATUS */}
          <Typography
            variant="caption"
            sx={{
              backgroundColor:
                task.status === "completed" ? "#e6f4ea" : "#fff4e5",
              color:
                task.status === "completed" ? "#2e7d32" : "#ed6c02",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {task.status}
          </Typography>


          <Tooltip title="Delete Task">
            <IconButton onClick={() => onDelete(task._id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </Box>

      </CardContent>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>

        <MenuItem
          onClick={() => {
            onEdit(task);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Task
        </MenuItem>

        <MenuItem
          onClick={() => {
            onStatusChange(task);
            handleMenuClose();
          }}
        >
          <DoneAllIcon fontSize="small" sx={{ mr: 1 }} />
          {task.status === "completed"
            ? "Mark as Pending"
            : "Mark as Completed"}
        </MenuItem>

      </Menu>
    </Card>
  );
};

export default TaskCard;