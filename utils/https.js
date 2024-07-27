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


export async function register(username, email, password, password_confirmation) {
    try {
        const response = await axios.post(BACKEND_URL + '/register', {
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
    console.log("Email: " + email);
    console.log("Password: " + password);

    try {
        const response = await api.post('/login', { email, password });
        console.log("Response Data: ", response.data);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Response Error: ", error.response);
            if (error.response.status === 401) {
                throw ['Invalid email or password'];
            } else {
                throw ['An unexpected error occurred'];
            }
        } else if (error.request) {
            console.error("Request Error: ", error.request);
            throw ['No response received from the server'];
        } else {
            console.error("Error: ", error.message);
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