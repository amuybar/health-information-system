import axios from "axios";

/**
 * Axios instance for making HTTP requests to the backend API.
 * 
 * - The baseURL is set from the environment variable VITE_API_URL.
 * - Defaults to "http://localhost:8000/api/v1" if the environment variable is not set.
 * - Use this instance to ensure consistent API configuration across the app.
 **/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://18.206.57.6/api/v1",
});

export default api;