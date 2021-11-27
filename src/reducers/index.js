import { combineReducers } from 'redux';
import user from './user';
import templates from './templates';

const myReducer = combineReducers({
    user,
    templates,
});

export default myReducer;