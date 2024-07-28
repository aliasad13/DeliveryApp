// tokenService.js

import * as SecureStore from 'expo-secure-store';
import { Store } from "../src/Store";

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

