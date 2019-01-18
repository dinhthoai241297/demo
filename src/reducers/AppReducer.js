import * as types from '../actions/ActionTypes';
import initialState from './initialState';

const AppReducer = (state = initialState.app, action) => {
    switch (action.type) {
        case types.CHANGE_LANGUAGE:
            return { ...state, language: action.data };
        default:
            return { ...state };
    }
}

export default AppReducer;
