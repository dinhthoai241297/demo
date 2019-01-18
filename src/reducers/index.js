import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
    AppReducer,
    UserReducer
});

export default RootReducer;
