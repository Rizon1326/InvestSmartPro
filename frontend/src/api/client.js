import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories
export const getCategories = () => api.get('/categories/');

// Business Ideas
export const getBusinessIdeas = () => api.get('/business-ideas/');
export const getBusinessIdea = (id) => api.get(`/business-ideas/${id}/`);
export const createBusinessIdea = (data) => api.post('/business-ideas/', data);
export const updateBusinessIdea = (id, data) => api.put(`/business-ideas/${id}/`, data);
export const deleteBusinessIdea = (id) => api.delete(`/business-ideas/${id}/`);
export const simulateBusinessIdea = (id, data) => api.post(`/business-ideas/${id}/simulate/`, data);
export const getBusinessScenarios = (id) => api.get(`/business-ideas/${id}/scenarios/`);
export const getBusinessHistory = (id) => api.get(`/business-ideas/${id}/history/`);

// Simulations
export const getSimulations = () => api.get('/simulations/');

// Chat
export const sendChatMessage = (data) => api.post('/chat/', data);
export const startNewChat = () => api.post('/chat/new/');
export const getChatHistory = (sessionId) => api.get(`/chat/history/${sessionId}/`);

// Lessons
export const getLessons = () => api.get('/lessons/');
export const getLesson = (slug) => api.get(`/lessons/${slug}/`);
export const completeLesson = (slug) => api.post(`/lessons/${slug}/complete/`);

// Progress
export const getProgress = () => api.get('/progress/');

// Health
export const healthCheck = () => api.get('/health/');

export default api;
