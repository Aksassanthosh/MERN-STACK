import axios from "axios";

// Create Axios instance with base URL set to your server
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
});

// Request interceptor: Attach JWT token to the request header if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from sessionStorage
    const accessToken = sessionStorage.getItem('logintoken');
    
    // If the token exists, attach it to the Authorization header
    if (accessToken) {
      if (config) {
        config.headers.token = accessToken;
      }
    }

    return config; // Return the modified config
  },
  (error) => {
    // If there's an error, reject the promise with the error
    return Promise.reject(error);
  }
);

// Export the axios instance to be used throughout the app
export default axiosInstance;
