import axios from 'axios';

const BACKEND_URL = 'http://192.168.20.2:3001'

export async function Register(username, email, password, password_confirmation) {
    try {
        const response = await axios.post(BACKEND_URL + '/auth', {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            confirm_success_url: "http://192.168.20.3:3001/", // Specify your confirmation URL here
            username: username // Add username parameter
        });
        console.log('Registration successful:', response.data);
        return response.data; // Return response data
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw error; // Throw error to handle it in the component
    }
};