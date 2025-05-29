// Axios configuration with authorization handling
const axiosInstance = axios.create({
  baseURL: '/api', // Adjust this to match your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login.html';
      }

      // Handle other common errors
      switch (error.response.status) {
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosInstance;
