import { FETCH_TEMPLATES } from "../constants/ActionTypes";

let initialState = [];

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEMPLATES:
            state = action.templates;
            return state;
        default:
            return state;
    }
}

export default myReducer;