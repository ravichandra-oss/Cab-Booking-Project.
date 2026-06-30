import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// User APIs
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const getUserProfile = () => API.get('/users/profile');

// Booking APIs
export const bookRide = (data) => API.post('/bookings', data);
export const getRideHistory = () => API.get('/bookings/my');
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}`, { status });

// Car APIs
export const getCars = () => API.get('/cars');
export const getCarById = (id) => API.get(`/cars/${id}`);
export const addCar = (formData) => API.post('/cars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCar = (id, formData) => API.put(`/cars/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCar = (id) => API.delete(`/cars/${id}`);

// Admin APIs
export const registerAdmin = (data) => API.post('/admin/register', data);
export const loginAdmin = (data) => API.post('/admin/login', data);
export const getAdminUsers = () => API.get('/admin/users');
export const getAdminUserById = (id) => API.get(`/admin/users/${id}`);
export const updateAdminUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getAdminBookings = () => API.get('/bookings');
export const getAdminAnalytics = () => API.get('/admin/analytics');

export default API;
