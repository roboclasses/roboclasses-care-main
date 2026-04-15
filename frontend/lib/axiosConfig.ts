import axios from 'axios';

// Create axios instance with Authorization header interceptor
export const axiosInstance = axios.create();

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Clear cookie too
        document.cookie = 'token=; max-age=0; path=/';
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper to set token in both localStorage and cookie
export const setTokenInStorage = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // Set cookie for server-side middleware
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);
    document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }
};

// Helper to clear token from both localStorage and cookie
export const clearTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    document.cookie = 'token=; max-age=0; path=/';
  }
};

export default axiosInstance;
