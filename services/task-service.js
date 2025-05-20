import axios from "axios";

export const createTask = (payload) => {
  return axios.post("https://jsonplaceholder.typicode.com/todos", payload);
};

export const getTasks = (payload) => {
  return axios.get("https://jsonplaceholder.typicode.com/todos", payload);
};

export const updateTask = (id, payload) => {
  return axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
};

export const deleteTask =   (id) => {
  return axios.delete("https://jsonplaceholder.typicode.com/todos/" + id);
};
