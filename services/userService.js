import axios from "axios";
import * as SecureStore from "expo-secure-store";


const BACKEND_URL = 'http://192.168.20.2:3001';

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const accessTokenFromSecureStore = async () => await SecureStore.getItemAsync('accessToken');
const refreshTokenFromSecureStore = async () => await SecureStore.getItemAsync('refreshToken');

async function refreshTokens() {
    try {
        const refreshToken = await refreshTokenFromSecureStore();
        const response = await axios.post(`${BACKEND_URL}/refresh`, {}, {

            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        return response.data.accessToken;
    } catch (error) {
        console.error("Token refresh failed: ", error.response.data.errors);
        throw error.response.data.errors;
    }
}

api.interceptors.request.use(
    async config => {
        const accessToken = await accessTokenFromSecureStore();
        console.log('UserService AccessToken---------------------', accessToken)
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

const fetchUserData = async () => {
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

export default {fetchUserData}