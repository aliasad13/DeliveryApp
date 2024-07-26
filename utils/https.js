import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// import * as SecureStore from 'expo-secure-store' and const token = await SecureStore.getItemAsync('userToken');,
// I will get the user authentication token if there is one

// SecureStore.setItemAsync('userToken') will store the auth token under the key 'userToken' in the device's secure storage.
// SecureStore.getItemAsync('userToken') will attempt to retrieve the value stored under the key 'userToken' from the device's secure storage.
// this is a secure storage used to store the private info while redux is a app wide state management.

const BACKEND_URL = 'http://192.168.20.2:3001';

// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if this is a login request
        if (originalRequest.url === '/login') {
            // Don't attempt to refresh for login errors
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Access tokens typically have a short lifespan for security reasons. When they expire, the user would normally need to log in again.
                // To avoid frequent logins, a refresh token (which has a longer lifespan) is used to obtain a new access token when the current one expires.
                const refreshToken = await SecureStore.getItemAsync('refreshToken');
                const res = await axios.post(`${BACKEND_URL}/refresh`, { refreshToken });
                if (res.status === 200) {
                    await SecureStore.setItemAsync('token', res.data.token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, reject the promise
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export async function register(username, email, password, password_confirmation) {
    try {
        const response = await axios.post(BACKEND_URL + '/register', {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            username: username
        });
        console.log('Registration successful:', response.data);
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
        await SecureStore.setItemAsync('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            throw ['Invalid email or password'];
        } else {
            throw ['An unexpected error occurred'];
        }
    }
}

export async function logout() {
    try {
        await SecureStore.deleteItemAsync('token');
        } catch (error) {
        console.error('Error during logout:', error);
    }
}

// export async function logout() {
//     try {
//         await api.post('/logout');
//         await SecureStore.deleteItemAsync('userToken');
//     } catch (error) {
//         console.error('Registration failed:', error.response?.data);
//         if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
//             throw error.response.data.errors;
//         } else if (error.response?.data?.error) {
//             throw [error.response.data.error];
//         } else {
//             throw ['An unexpected error occurred'];
//         }
//     }
// }

// Example of a protected request
export async function getProtectedData() {
    try {
        const response = await api.get('/protected-route');
        return response.data;
    }catch (error) {
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