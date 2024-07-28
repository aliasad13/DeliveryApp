import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {Store} from "../src/Store";
import {setAccessToken, setRefreshToken} from "../src/actions/GeneralAction";

const BACKEND_URL = 'http://192.168.20.2:3001';
const accessTokenFromState = () => Store?.getState()?.generalState?.accessToken;
const refreshTokenFromState = () => Store?.getState()?.generalState?.refreshToken;

const accessTokenFromSecureStore = async () => await SecureStore.getItemAsync('accessToken');
const refreshTokenFromSecureStore = async () => await SecureStore.getItemAsync('refreshToken');

const getAccessToken = async () => {
    let accessToken = accessTokenFromState();
    if (!accessToken) {
        accessToken = await accessTokenFromSecureStore();
    }
    return accessToken;
}

const getRefreshToken = async () => {
    let refreshToken = refreshTokenFromState();
    if (!refreshToken) {
        refreshToken = await refreshTokenFromSecureStore();
    }
    return refreshToken;
}

// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Function to refresh tokens
export async function refreshTokens() {
    try {
        const refreshToken = await getRefreshToken();
        const response = await axios.post(`${BACKEND_URL}/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        console.log('----------------------RefreshTokenResponse--------------------------:', response?.data)

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // Update SecureStore
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        await SecureStore.setItemAsync('refreshToken', newRefreshToken);

        return newAccessToken;
    } catch (error) {
        console.error("Token refresh failed: ", error.response);
        throw ['An unexpected error occurred'];
    }
}

// Add a request interceptor to inject the access token
api.interceptors.request.use(
    async config => {
        const accessToken = await getAccessToken();
        console.log('token: ', accessToken)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
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
        // Check if the request is for the login endpoint
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/login') {
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
        if (error.response?.data?.errors) {
            throw [error.response.data.errors];
        } else {
            throw ['An unexpected error occurred'];
        }
    }
}


export const getUserData = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        if (error.response?.data?.errors) {
            throw [error.response.data.errors];
        }else {
            throw ['An unexpected error occurred'];
        }
    }
};
// User Service


//my doubt is that we are refreshing the token when the access token is invalid in https.js, so when we are refreshing
// the token, should we update the token in state also or will it get updated by appStart() ?
//
// Great question! Your setup is good, but there are a few considerations to make it more robust:
//
// Updating tokens after refresh: When you refresh the token in https.js, you should indeed update both the
// SecureStore and the Redux state. appStart() only runs when the app initializes, so it won't catch token updates that
// happen during the app's lifecycle.
