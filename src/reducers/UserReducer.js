import * as actions from './../actions/ActionTypes';
import initialState from './initialState';

const UserReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return { user: action.data.user, token: action.data.token };
        }
        case actions.LOGOUT: {
            return { user: null, token: '' };
        }
        case actions.UPDATE_USER: {
            return { ...state, user: { ...state.user, ...action.data } };
        }
        default: {
            return { ...state };
        }
    }
}

export default UserReducer;
