const redux = require("redux");


// 1. Create a reducer
// The reducer is a function that takes the current state and an action, does some operations like
// adding into to the state/array, removing from the state as demanded by the action type
// and returns the new state

// reducer must always return a immutable array, so we cannot mutate it. so we should not use functions like push, pop, unshift, shift, ... in reducer
const reducer1 = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter((item, index) => item !== action.payload);
        default:
            return state;
    }
};




// 2. Create a store
const store = redux.createStore(reducer1); // => reducer1 is the reducer for store, to which an action can be dispatched using store.dispatch(action)

console.log("state1:",store.getState());





// 3. action is a simple object, it will have a type, which is a string and a payload. payload is the element or thing we
// provide to the reducer that will be added or removed from the state as per the type

const action1 = {
    type: 'ADD_ITEM',
    payload: 1
}

// the store will have a method 'dispatch', dispatch is used to send an action to the stores reducer

store.dispatch(action1)

console.log("state2:",store.getState());













//////////////////////////////////////////////

const action2 = {
    type: 'REMOVE_ITEM',
    payload: 1
}

store.dispatch(action2)

console.log("state3:",store.getState());