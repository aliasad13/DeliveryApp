import * as SecureStore from 'expo-secure-store';

const getFirstTimeUse = async () => {
    try {
        const value = await SecureStore.getItemAsync('isFirstTimeUse');
        return value // If null, it's the first time
    } catch (error) {
        console.error('Error checking first time user:', error);
        return true; // Assume it's the first time if there's an error
    }
};

const setFirstTimeUse = async () => {
    try {
        await SecureStore.setItemAsync('isFirstTimeUse', 'false');
        // initially in SecureStore, there wont be any value for isFirstTimeUse.
        // On clicking get started we add a value.
        // then in appStart we check if there is value for isFirstTimeUse in SecureStore.
        // this is used to display or hide welcome screen
    } catch (error) {
        console.error('Error setting not first time user:', error);
    }
};

const removeFirstTimeUse = async () => {
    try {
        await SecureStore.deleteItemAsync('isFirstTimeUse');
    } catch (error) {
        console.error('Error setting not first time user:', error);
    }
};

const getUserAccessToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('accessToken');
        return token;
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};

const getUserRefreshToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('refreshToken');
        return token;
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};

const setUserAccessToken = async (token) => {
    console.log('setUserAccessToken', token)

    try {
        await SecureStore.setItemAsync('accessToken', token);
    } catch (error) {
        console.error('Error setting user token:', error);
    }
};

const setUserRefreshToken = async (token) => {
    console.log('setUserRefreshToken', token)

    try {
        await SecureStore.setItemAsync('refreshToken', token);
    } catch (error) {
        console.error('Error setting user token:', error);
    }
};

export const removeUserToken = async () => {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
        console.error('Error removing user token:', error);
    }
};

export default {getUserAccessToken, setUserRefreshToken, getUserRefreshToken,
    getFirstTimeUse, setFirstTimeUse, setUserAccessToken, removeUserToken, removeFirstTimeUse}
