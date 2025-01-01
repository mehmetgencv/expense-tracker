import axios, { InternalAxiosRequestConfig } from 'axios';
import type { Expense, LoginRequest, SignupRequest, AuthResponse, ExpenseCategoryReport } from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('%c Token Added ', 'background: #27ae60; color: #fff; font-weight: bold;', {
      url: config.url,
      token: `Bearer ${token.substring(0, 20)}...`
    });
  } else {
    console.log('%c No Token ', 'background: #e74c3c; color: #fff; font-weight: bold;', {
      url: config.url
    });
  }
  return config;
}, (error) => {
  console.error('%c Request Error ', 'background: #c0392b; color: #fff; font-weight: bold;', error);
  return Promise.reject(error);
});

// Add response interceptor for handling auth errors globally
api.interceptors.response.use(
  (response) => {
    console.log('%c API Response ', 'background: #2ecc71; color: #fff; font-weight: bold;', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('%c API Error ', 'background: #e74c3c; color: #fff; font-weight: bold;', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle 401 errors globally
    if (error.response?.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
      authService.logout();
    }

    return Promise.reject(error);
  }
);

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/signin', {
        username: data.username,
        password: data.password
      });
      
      console.log('Login response:', response.data);
      
      // The token is in response.data.accessToken based on JwtResponse structure
      const token = response.data.accessToken || response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        // Set the token in axios defaults immediately
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return {
          token: token,
          type: response.data.tokenType || response.data.type,
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles || []
        };
      } else {
        console.error('Response structure:', response.data);
        throw new Error('No token received from server');
      }
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      throw error;
    }
  },

  signup: async (data: SignupRequest): Promise<void> => {
    await api.post('/auth/signup', {
      username: data.username,
      email: data.email,
      password: data.password
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  }
};

export const expenseService = {
  getAllExpenses: async (): Promise<Expense[]> => {
    const response = await api.get('/v1/expenses');
    return response.data.data;
  },

  getExpenseById: async (id: number): Promise<Expense> => {
    const response = await api.get(`/v1/expenses/${id}`);
    return response.data.data;
  },

  addExpense: async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    const response = await api.post('/v1/expenses', expense);
    return response.data.data;
  },

  updateExpense: async (id: number, expense: Partial<Expense>): Promise<Expense> => {
    const response = await api.put(`/v1/expenses/${id}`, expense);
    return response.data.data;
  },

  deleteExpense: async (id: number): Promise<void> => {
    await api.delete(`/v1/expenses/${id}`);
  },

  getExpensesBetweenDates: async (startDate: string, endDate: string): Promise<Expense[]> => {
    const response = await api.get('/v1/expenses/between', {
      params: { 
        startDate: `${startDate}T00:00:00`,
        endDate: `${endDate}T23:59:59`
      }
    });
    return response.data.data;
  },

  getMonthlyReport: async (year: number, month: number): Promise<Expense[]> => {
    const response = await api.get('/v1/expenses/reports/monthly', {
      params: { year, month }
    });
    return response.data.data;
  },

  getYearlyReport: async (year: number): Promise<Expense[]> => {
    const response = await api.get('/v1/expenses/reports/yearly', {
      params: { year }
    });
    return response.data.data;
  },

  getCategoryReport: async (startDate: string, endDate: string): Promise<ExpenseCategoryReport[]> => {
    const response = await api.get('/v1/expenses/reports/category', {
      params: { 
        startDate: `${startDate}T00:00:00`,
        endDate: `${endDate}T23:59:59`
      }
    });
    return response.data.data;
  }
}; 