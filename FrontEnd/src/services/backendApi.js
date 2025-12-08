import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  forgotPassword: (data) => apiClient.post('/auth/forgot-password', data),
  resetPassword: (token, data) => apiClient.patch(`/auth/reset-password/${token}`, data),
};

// Incidents APIs
export const incidentsAPI = {
  getAll: (params) => apiClient.get('/incidents', { params }),
  getById: (id) => apiClient.get(`/incidents/${id}`),
  create: (data) => apiClient.post('/incidents', data),
  update: (id, data) => apiClient.patch(`/incidents/${id}`, data),
  delete: (id) => apiClient.delete(`/incidents/${id}`),
};

// Users APIs
export const usersAPI = {
  getProfile: () => apiClient.get('/users/me'),
  updateProfile: (data) => apiClient.patch('/users/me', data),
  changePassword: (data) => apiClient.patch('/users/change-password', data),
  getDashboard: () => apiClient.get('/users/dashboard'),
};

// Upload APIs
export const uploadAPI = {
  uploadImage: (formData) => apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteImage: (id) => apiClient.delete(`/upload/${id}`),
};

export default apiClient;
