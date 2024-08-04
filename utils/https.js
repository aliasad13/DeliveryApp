import axios from 'axios';
import {getAccessToken, refreshTokens} from "../services/tokenService";

const BACKEND_URL = 'http://192.168.20.2:3001';


// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Function to refresh tokens


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
            // the logic to log user out is written in refreshTokens()
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export async function register(firstName, lastName, username, email, password, password_confirmation) {
    try {
        const response = await api.post('/register', {
            first_name: firstName,
            last_name: lastName,
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

export async function updateFullName(userId, firstName, lastName) {
    try {
        const response = await api.patch(`/users/${userId}/update_names`, {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
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

export async function updateUsername(userId, username) {
    try {
        const response = await api.patch(`/users/${userId}/update_names`, {
            user_id: userId,
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

export async function sendMailVerificationOtp(userId, email) {
    try {
        const response = await api.post(`/users/${userId}/send_mail_verification_otp`, {
            user_id: userId,
            mail: email
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

export async function updateEmail(userId, newEmail, otp) {
    try {
        const response = await api.patch(`/users/${userId}/update_email`, {
            user_id: userId,
            new_email: newEmail,
            otp: otp,
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

export async function changePassword(userId, currentPassword, newPassword) {
    try {
        const response = await api.patch(`/users/${userId}/update_password`, {
            user_id: userId,
            current_password: currentPassword,
            new_password: newPassword,
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

export async function updateUserProfilePic(userId, profileData) {
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi",profileData)
    try {
        const formData = new FormData();
        if (profileData.profile_picture) {
            formData.append('user[profile_picture_attributes][image]', {
                uri: profileData.profile_picture.uri,
                name: 'profile.jpg',
                type: 'image/jpeg',
            });
        }

        const response = await api.patch(`/users/${userId}/update_profile_picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('User update failed:', error.response?.data);
        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
            throw error.response.data.errors;
        } else if (error.response?.data?.error) {
            throw [error.response.data.error];
        } else {
            throw ['An unexpected error occurred'];
        }
    }
}




// User Service


//my doubt is that we are refreshing the token when the access token is invalid in https.js, so when we are refreshing
// the token, should we update the token in state also or will it get updated by appStart() ?
//
// Great question! Your setup is good, but there are a few considerations to make it more robust:
//
// Updating tokens after refresh: When you refresh the token in https.js, you should indeed update both the
// SecureStore and the Redux state. appStart() only runs when the app initializes, so it won't catch token updates that
// happen during the app's lifecycle.
