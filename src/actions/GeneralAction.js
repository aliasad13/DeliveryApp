import StorageService from "../../services/StorageService";
import userService, {
    fetchUserData
} from '../../services/userService'
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as Font from 'expo-font';

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    REMOVE_FIRST_TIME_USE: 'REMOVE_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA',
    SET_FONTS_LOADED: 'SET_FONTS_LOADED',
    SET_FONT_ERROR: 'SET_FONT_ERROR'
}

const setIsAppLoading = (isAppLoading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading
    };
}

const setAccessToken = (token) => {
    return {
        type: types.SET_ACCESS_TOKEN,
        payload: token
    };
}

const setRefreshToken = (token) => {
    return {
        type: types.SET_REFRESH_TOKEN,
        payload: token
    };
}

const removeToken = () => {
    return {
        type: types.REMOVE_TOKEN,
    };
}

const setIsFirstTimeUse = () => {
    return {
        type: types.SET_FIRST_TIME_USE,
        payload: false
    };
}

const removeIsFirstTimeUse = () => {
    return {
        type: types.REMOVE_FIRST_TIME_USE,
    };
}

const setFontsLoaded = (fontsLoaded) => {
    return {
        type: types.SET_FONTS_LOADED,
        payload: fontsLoaded
    };
};

const setFontError = (fontError) => {
    return {
        type: types.SET_FONT_ERROR,
        payload: fontError
    };
};

async function refreshTokensUser() {
    try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const response = await axios.post(`${BACKEND_URL}/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        console.log('----------------------RefreshTokenResponse--------------------------:', response?.data);

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // Update SecureStore
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        await SecureStore.setItemAsync('refreshToken', newRefreshToken);

        return { newAccessToken, newRefreshToken };
    } catch (error) {
        console.error("+++++======+++++===++++=++++ Token refresh failed: ", error.response);
        throw error.response;
    }
}

async function logoutUserService() {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        console.error('secure store tokens has been deleted' );
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


const appStart = () => {
    console.log('----------------------------inside appStart--------------------------------')
    return async (dispatch, getState) => {
        try {
            // Use Promise.all to wait for both async operations to complete
            const [isFirstTimeUse, accessToken, refreshToken, fontsLoaded] = await Promise.all([
                StorageService.getFirstTimeUse(),
                StorageService.getUserAccessToken(),
                StorageService.getUserRefreshToken(),
                Font.loadAsync({
                    'astrix': require('../../assets/Fonts/Asterix.ttf'),
                    'rubik-black': require('../../assets/Fonts/Rubik-Black.ttf'),
                    'rubik-blackItalic': require('../../assets/Fonts/Rubik-BlackItalic.ttf'),
                    'rubik-bold': require('../../assets/Fonts/Rubik-Bold.ttf'),
                    'rubik-boldItalic': require('../../assets/Fonts/Rubik-BoldItalic.ttf'),
                    'rubik-medium': require('../../assets/Fonts/Rubik-Medium.ttf'),
                    'rubik-Regular': require('../../assets/Fonts/Rubik-Regular.ttf'),
                }).then(() => true).catch((error) => { throw error; })
            ]);

            const isActuallyFirstTimeUse = isFirstTimeUse === null || isFirstTimeUse === undefined;
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isActuallyFirstTimeUse
            });

            console.log('appStart() AccessToken---------------------', accessToken)
            if (accessToken) {
                dispatch({
                    type: types.SET_ACCESS_TOKEN,
                    payload: accessToken
                });
                if (refreshToken) {
                    dispatch({
                        type: types.SET_REFRESH_TOKEN,
                        payload: refreshToken
                    });
                }

                let userData;
                try {
                    userData = await userService.fetchUserData();
                } catch (error) {
                    console.log("Error fetching user data------------------------------------------------>>>>>>>>: ", error);
                    try {
                        // if there is error fetching the userData we create a refresh token and send the request again in hope that the issue is because of expired token
                        const { newAccessToken, newRefreshToken } = await refreshTokensUser();
                        console.log("newAccessToken:::", newAccessToken);
                        console.log("newRefreshToken::::", newAccessToken);
                        dispatch({
                            type: types.SET_ACCESS_TOKEN,
                            payload: newAccessToken
                        });
                        dispatch({
                            type: types.SET_REFRESH_TOKEN,
                            payload: newRefreshToken
                        });
                        userData = await userService.fetchUserData();
                    } catch (refreshError) {
                        // if there occurs error in creating the refresh token this means the token is absent of the is invalid, so we log the user out
                        console.log("Error refreshing token and fetching user data: ", refreshError);
                        await logoutUserService();
                        dispatch({
                            type: types.REMOVE_TOKEN
                        });
                        console.error('redux state tokens has been deleted' );
                        return;
                    }
                }
                console.log("Finally userData ", userData);

                if (userData?.status) {
                    console.log(userData);
                    dispatch({
                        type: types.SET_USER_DATA,
                        payload: userData
                    });
                } else {
                    console.log('User data does not have status');
                }
            }

            console.log('fontsLoaded =================>', fontsLoaded)
            if (fontsLoaded){
                dispatch({
                    type: types.SET_FONTS_LOADED,
                    payload: true
                });
            }
            dispatch({
                type: types.SET_IS_APP_LOADING,
                payload: false
            });

        } catch (error) {
            console.error("Error in appStart:", error);
            // Ensure isAppLoading is set to false even if there's an error
            dispatch({
                type: types.SET_IS_APP_LOADING,
                payload: false
            });
        }
    }
}


export { setIsAppLoading, setAccessToken, setRefreshToken, types, appStart, setIsFirstTimeUse, removeToken, removeIsFirstTimeUse, setFontsLoaded };