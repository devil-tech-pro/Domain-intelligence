import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: data.error || data.message || 'An error occurred'
        }
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        ...error,
        message: 'Network error. Please check your connection.'
      });
    } else {
      // Something else happened
      return Promise.reject({
        ...error,
        message: error.message || 'An error occurred'
      });
    }
  }
);

// Domain service
export const domainService = {
  analyzeDomain: (domain) => api.get(`/domain/analyze/${domain}`),
  getWhoisInfo: (domain) => api.get(`/domain/whois/${domain}`),
  getDnsRecords: (domain) => api.get(`/domain/dns/${domain}`),
  getSslInfo: (domain) => api.get(`/domain/ssl/${domain}`),
  saveReport: (domain, reportData) => api.post('/reports/save', { domain, reportData }),
  exportReport: (domain) => api.get(`/reports/export/${domain}`, { responseType: 'blob' }),
};

// Report service
export const reportService = {
  getReports: () => api.get('/reports'),
  getReport: (id) => api.get(`/reports/${id}`),
  exportReport: (id) => api.get(`/reports/export/${id}`, { responseType: 'blob' }),
  deleteReport: (id) => api.delete(`/reports/${id}`),
};

export default api;
