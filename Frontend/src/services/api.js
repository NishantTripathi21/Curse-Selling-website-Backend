import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin API calls
export const adminAPI = {
  signup: (credentials) => api.post('/admin/signup', credentials),
  signin: (credentials) => api.post('/admin/signin', credentials),
  createCourse: (courseData) => api.post('/admin/courses', courseData),
  getCourses: () => api.get('/admin/courses'),
};

// User API calls
export const userAPI = {
  signup: (credentials) => api.post('/user/signup', credentials),
  signin: (credentials) => api.post('/user/signin', credentials),
  getCourses: () => api.get('/user/courses'),
  purchaseCourse: (courseId) => api.post(`/user/courses/${courseId}`),
  getPurchasedCourses: () => api.get('/user/purchasedCourses'),
};

export default api;