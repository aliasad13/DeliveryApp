// tokenService.js

import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {Store} from "../src/Store";
import {removeToken, setAccessToken, setRefreshToken} from "../src/actions/GeneralAction";

export const getAccessTokenFromSecureStore = async () => await SecureStore.getItemAsync('accessToken');
export const getRefreshTokenFromSecureStore = async () => await SecureStore.getItemAsync('refreshToken');

export const getAccessTokenFromState = () => Store?.getState()?.generalState?.accessToken;
export const getRefreshTokenFromState = () => Store?.getState()?.generalState?.refreshToken;

export const getAccessToken = async () => {
    let accessToken = getAccessTokenFromState();
    if (!accessToken) {
        accessToken = await getAccessTokenFromSecureStore();
    }
    return accessToken;
}

export const getRefreshToken = async () => {
    let refreshToken = getRefreshTokenFromState();
    if (!refreshToken) {
        refreshToken = await getRefreshTokenFromSecureStore();
    }
    return refreshToken;
}

export const updateTokensInState = (accessToken, refreshToken) => {
    Store.dispatch(setAccessToken(accessToken));
    Store.dispatch(setRefreshToken(refreshToken));
}

const logoutUser = async () => {
    try {
        // Clear tokens from SecureStore
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        Store.dispatch(removeToken());

    } catch (error) {
        console.error('Error during logout:', error);
    }
}

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

        updateTokensInState()

        return newAccessToken;
    } catch (error) {
        console.error("Token refresh failed: ", error.response);
        await logoutUser(); // Log out the user if refresh fails => this is because, if any request fails due to 401,
        // a request is send to refresh end point hoping that its because of expired token.
        // To send a refresh request we need a refresh token.
        // Without any token, the refresh end point will return a 401 error
        throw error.response;
    }
}


