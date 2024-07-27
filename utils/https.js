import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.20.2:3001';

// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get token from secure storage
async function getAccessToken() {
    return await SecureStore.getItemAsync('accessToken');
}

// Function to refresh tokens
async function refreshTokens() {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    try {
        const response = await axios.post(`${BACKEND_URL}/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        await SecureStore.setItemAsync('accessToken', response.data.accessToken);
        await SecureStore.setItemAsync('refreshToken', response.data.refreshToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Token refresh failed: ", error.response);
        throw ['An unexpected error occurred'];
    }
}

// Add a request interceptor to inject the access token
api.interceptors.request.use(
    async config => {
        const token = await getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshTokens();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export async function register(username, email, password, password_confirmation) {
    try {
        const response = await api.post('/register', {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            username: username
        });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data);
        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
            throw error.response.data.errors;
        } else if (error.response?.data?.error) {
            throw [error.response.data.error];
        } else {
            throw ['An unexpected error occurred'];
        }
    }
}

export async function login(email, password) {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw ['Invalid email or password'];
        } else {
            throw ['An unexpected error occurred'];
        }
    }
}

export async function fetchData() {
    try {
        const response = await api.get('/data');
        return response.data;
    } catch (error) {
        throw ['An unexpected error occurred'];
    }
}
