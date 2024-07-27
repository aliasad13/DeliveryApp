import {types} from "../actions/GeneralAction";

const initialState = {
    isAppLoading: true,
    accessToken: '', //token needed to be added in state management because its ued in every transaction
    refreshToken: '', //token needed to be added in state management because its ued in every transaction
    isFirstTimeUse: true
}

const GeneralReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_IS_APP_LOADING:
            return {...state, isAppLoading: action.payload};
        case types.SET_ACCESS_TOKEN:
            console.log("+++++++++++refreshToken:", action.payload)
            return {...state, accessToken: action.payload};
        case types.SET_REFRESH_TOKEN:
            console.log("+++++++++++refreshToken:", action.payload)
            return {...state, refreshToken: action.payload};
        case types.SET_FIRST_TIME_USE:
            return {...state, isFirstTimeUse: action.payload};
        case types.REMOVE_TOKEN:
            return {...state, accessToken: '', refreshToken: ''};
        default:
            return state;
    }
}

export default GeneralReducer;