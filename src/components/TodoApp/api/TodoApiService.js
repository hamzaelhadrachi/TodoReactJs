import axios from "axios";

axios.create({
  baseURL: "http://localhost:8080"
});

export const retrieveAllTodosForUser = (user) => axios.get(`http://localhost:8080/users/${user}/todos`);

export const deleteTodoForUser = (user,id) => axios.delete(`http://localhost:8080/users/${user}/todos/${id}`);

export const retrieveTodoForUser = (user,id) => axios.get(`http://localhost:8080/users/${user}/todos/${id}`);