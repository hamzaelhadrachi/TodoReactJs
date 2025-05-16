import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = (user) => apiClient.get(`hello/${user}`);