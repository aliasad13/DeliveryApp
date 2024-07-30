import {types} from "../actions/GeneralAction";
import omit from 'lodash/omit';


const initialState = {
    isAppLoading: true,
    accessToken: '', //token needed to be added in state management because its ued in every transaction
    refreshToken: '', //token needed to be added in state management because its ued in every transaction
    isFirstTimeUse: true,
    userData: {},
    fontsLoaded: false,
    screen: 'home'
}

const GeneralReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_IS_APP_LOADING:
            return {...state, isAppLoading: action.payload};
        case types.SET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload};
        case types.SET_REFRESH_TOKEN:
            return {...state, refreshToken: action.payload};
        case types.SET_FIRST_TIME_USE:
            return {...state, isFirstTimeUse: action.payload};
        case types.REMOVE_FIRST_TIME_USE:
            const newState = omit(state, 'isFirstTimeUse');
            return newState
        case types.REMOVE_TOKEN:
            return {...state, accessToken: '', refreshToken: ''};
        case types.SET_USER_DATA:
            return {...state, userData: action.payload};
        case types.SET_FONTS_LOADED:
            return {...state, fontsLoaded: action.payload};
        case types.SET_SCREEN:
            const newsState = { ...state, screen: action.payload };
            return newsState;
        default:
            return state;
    }
}

export default GeneralReducer;