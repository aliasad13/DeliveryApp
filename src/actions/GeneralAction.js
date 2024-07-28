import StorageService from "../../services/StorageService";
import userService, {fetchUserData} from '../../services/userService'

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    SET_REFRESH_TOKEN: 'SET_REFRESH_TOKEN',
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    REMOVE_FIRST_TIME_USE: 'REMOVE_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA'
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


const appStart = () => {
    console.log('----------------------------inside appStart--------------------------------')
    return async (dispatch, getState) => {
        try {
            // Use Promise.all to wait for both async operations to complete
            const [isFirstTimeUse, accessToken, refreshToken, userInfo] = await Promise.all([
                StorageService.getFirstTimeUse(),
                StorageService.getUserAccessToken(),
                StorageService.getUserRefreshToken(),
                userService.fetchUserData()
            ]);

            const isActuallyFirstTimeUse = isFirstTimeUse === null || isFirstTimeUse === undefined;
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isActuallyFirstTimeUse
            });

            if (accessToken) {
                dispatch({
                    type: types.SET_ACCESS_TOKEN,
                    payload: accessToken
                });
            }

            if (refreshToken) {
                dispatch({
                    type: types.SET_REFRESH_TOKEN,
                    payload: refreshToken
                });
            }

            if(userInfo){
                console.log(userInfo)
                dispatch({
                    type: types.SET_USER_DATA,
                    payload: userInfo
                })
                dispatch({
                    type: types.SET_IS_APP_LOADING,
                    payload: false
                });
            }

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


export { setIsAppLoading, setAccessToken, setRefreshToken, types, appStart, setIsFirstTimeUse, removeToken, removeIsFirstTimeUse };