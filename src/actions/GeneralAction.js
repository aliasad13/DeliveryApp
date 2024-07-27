import StorageService from "../../services/StorageService";

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE'
}

const setIsAppLoading = (isAppLoading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading
    };
}

const setToken = (token) => {
    return {
        type: types.SET_TOKEN,
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


const appStart = () => {
    return async (dispatch, getState) => {
        try {
            // Use Promise.all to wait for both async operations to complete
            const [isFirstTimeUse, token] = await Promise.all([
                StorageService.getFirstTimeUse(),
                StorageService.getUserToken()
            ]);

            const isActuallyFirstTimeUse = isFirstTimeUse === null || isFirstTimeUse === undefined;
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isActuallyFirstTimeUse
            });

            if (token) {
                dispatch({
                    type: types.SET_TOKEN,
                    payload: token
                });
            }

            // Set isAppLoading to false only after all other states are updated
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


export { setIsAppLoading, setToken, types, appStart, setIsFirstTimeUse, removeToken };