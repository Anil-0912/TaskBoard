import axios from "axios";

const TASK_API = "http://localhost:8080/tasks";
const AUTH_API = "http://localhost:8080/auth";

// Get tasks of specific user
export const getTasks = (userId:number) =>
  axios.get(`${TASK_API}/user/${userId}`);

// Create task
export const createTask = (task:any) =>
  axios.post(TASK_API, task);

// Update task
export const updateTask = (id:number, task:any) =>
  axios.put(`${TASK_API}/${id}`, task);

// Delete task
export const deleteTask = (id:number) =>
  axios.delete(`${TASK_API}/${id}`);


// Register
export const registerUser = (data:any) =>
  axios.post(`${AUTH_API}/register`, data);

// Login
export const loginUser = (data:any) =>
  axios.post(`${AUTH_API}/login`, data);