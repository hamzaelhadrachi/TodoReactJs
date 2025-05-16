import { apiClient } from "./ApiClient";

export const retrieveAllTodosForUser = (user) => apiClient.get(`/users/${user}/todos`);

export const deleteTodoForUser = (user,id) => apiClient.delete(`/users/${user}/todos/${id}`);

export const retrieveTodoForUser = (user,id) => apiClient.get(`/users/${user}/todos/${id}`);

export const updateTodoForUser = (user,id, todo) => apiClient.put(`/users/${user}/todos/${id}`, todo);

export const createTodoForUser = (user, todo) => apiClient.put(`/users/${user}/todos`, todo);

export const executeBasicAuthenticationService = (token) => 
    apiClient.get('/basicauth', {
        headers: {
            Authorization: token
        }
    });

export const executeJwtAuthenticationService = (userName,  password) => 
    apiClient.post('/authenticate',(userName, password));