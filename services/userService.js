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

const fetchUserData = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.log("+==========++++====+++====== error ", error)

        if (error.response?.data?.errors) {
            throw [error.response.data.errors];
        }else {
            throw ['An unexpected error occurred'];
        }
    }
};

export default {fetchUserData}