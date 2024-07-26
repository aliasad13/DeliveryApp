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
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',token)
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

const setIsFirstTimeUse = (isFirstTimeUse) => {
    console.log('isfirstlogin action parameter', isFirstTimeUse)
    return {
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTimeUse
    };
}


const appStart = () => {
    return(dispatch, getState) => { // this is the structure of action if we are using thunk

        StorageService.getFirstTimeUse().then(isFirstTimeUse => {
            console.log("appStart.isFirstTimeUse-----------------------", isFirstTimeUse)
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isFirstTimeUse == false ? false : true // if ther is anything inside isFirstTimeUse, then its not fist time use
            })
        })

        StorageService.getUserToken().then(token => {
            if(token){
               dispatch({
                   type: types.SET_TOKEN,
                   payload: token
               });
            }
        })


        dispatch({
            type: types.SET_IS_APP_LOADING,
            payload: false
        })

    }
}


export { setIsAppLoading, setToken, types, appStart, setIsFirstTimeUse,removeToken };