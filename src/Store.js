import {createStore, applyMiddleware} from "redux"; //redux thunk is a middle ware for redux
import {combineReducers} from "redux";
import GeneralReducer from "./reducers/GeneralReducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    generalState: GeneralReducer
})

const Store = createStore(rootReducer, applyMiddleware(thunk)); // store can dispatch an action to its reducer, this reducer uses the action to manipulate the system state
//thunk helps us to update the state from the action itself => check GeneralAction => appStart

const getAccessTokenFromStore = () => Store?.getState()?.generalState?.accessToken;
const getRefreshTokenFromStore = () => Store?.getState()?.generalState?.refreshToken;

export {Store, getAccessTokenFromStore, getRefreshTokenFromStore};