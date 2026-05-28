import API from "../api/api";

export const getAllTasks = () => API.get("/tasks/getAllTasks");

export const getSingleTask = (id) => API.get(`/tasks/getSingleTask/${id}`);

export const createTask = (data) => API.post("/tasks/createTask", data);

export const updateTask = (id, data) => API.put(`/tasks/updateTask/${id}`, data);

export const updateTaskStatus = (id) => API.put(`/tasks/updateTaskStatus/${id}`);

export const deleteTask = (id) => API.delete(`/tasks/deleteTask/${id}`);