import {types} from "../actions/GeneralAction";

const initialState = {
    isAppLoading: true,
    token: '', //token needed to be added in state management because its ued in every transaction
    isFirstTimeUse: true
}

const GeneralReducer = (state = initialState, action) => {
    console.log("generalReducer", "state: ",state , "action: ", action)
    switch(action.type) {
        case types.SET_IS_APP_LOADING:
            return {...state, isAppLoading: action.payload};
        case types.SET_TOKEN:
            return {...state, token: action.payload};
        case types.SET_FIRST_TIME_USE:
            return {...state, isFirstTimeUse: action.payload};
        case types.REMOVE_TOKEN:
            return {...state, token: ''};
        default:
            return state;
    }
}

export default GeneralReducer;