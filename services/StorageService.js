import * as SecureStore from 'expo-secure-store';

const getFirstTimeUse = async () => {
    try {
        const value = await SecureStore.getItemAsync('isFirstTimeUse');
        return value === null; // If null, it's the first time
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

const getUserToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        return token;
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
};

const setUserToken = async (token) => {
    try {
        await SecureStore.setItemAsync('token', token);
    } catch (error) {
        console.error('Error setting user token:', error);
    }
};

export const removeUserToken = async () => {
    try {
        await SecureStore.deleteItemAsync('token');
    } catch (error) {
        console.error('Error removing user token:', error);
    }
};

export default {getUserToken, getFirstTimeUse, setFirstTimeUse, setUserToken, removeUserToken}
