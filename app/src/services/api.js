import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({ baseURL: API_BASE })

// Auth
export const signup = (data) => api.post('/auth/signup', data)
export const login = (data) => api.post('/auth/login', data)

// Trips
export const getTrips = () => api.get('/trips')
export const getTrip = (id) => api.get(`/trips/${id}`)
export const createTrip = (data) => api.post('/trips', data)
export const updateTrip = (id, data) => api.put(`/trips/${id}`, data)
export const deleteTrip = (id) => api.delete(`/trips/${id}`)

// Activities
export const getActivities = (tripId) => api.get(`/trips/${tripId}/activities`)
export const addActivity = (tripId, data) => api.post(`/trips/${tripId}/activities`, data)
export const deleteActivity = (tripId, actId) => api.delete(`/trips/${tripId}/activities/${actId}`)

// AI
export const generateItinerary = (prompt) => api.post('/ai/generate-itinerary', { prompt })
export const getPackingSuggestions = (tripData) => api.post('/ai/packing-suggestions', tripData)
export const getBudgetEstimate = (tripData) => api.post('/ai/budget-estimate', tripData)

// Sygic proxy
export const searchCities = (query) => api.get(`/sygic/cities?q=${encodeURIComponent(query)}`)
export const getCityActivities = (cityId) => api.get(`/sygic/activities/${cityId}`)

export default api
