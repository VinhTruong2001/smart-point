import { SET_USER } from "../constants/ActionTypes";

let initialState = null;

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            state = action.user;
            console.log(state);
            return state;
        default:
            return state;
    }
}

export default myReducer;