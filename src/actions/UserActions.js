import * as types from './ActionTypes';
import httpRequest from '../services/httpRequest';
import urlRequestApi from '../services/urlRequestApi';
import * as func from '../utils/Utils';

export const loginApi = (email, password) => {
    return dispatch => httpRequest.postForm(urlRequestApi.user.login, { email, password }).then(res => {
        let rs = func.aesDecrypt(res.text);
        let session = func.aesEncrypt({
            token: rs.token,
            user: rs.user
        }).toString();
        localStorage.setItem('session', session);
        if (rs.code === 1) {
            dispatch(loginState(rs));
        }
        return rs;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const loginState = data => {
    return {
        type: types.LOGIN,
        data
    }
}

export const updateApi = (name, password, city, nation, session) => {
    return (dispatch, getState) => httpRequest.postForm(urlRequestApi.user.update, { name, password, city, nation, session }).then(res => {
        let rs = func.aesDecrypt(res.text);
        if (rs.code === 1) {
            let user = { name, password, city, nation };
            let session = func.aesEncrypt({
                token: getState().UserReducer.token,
                user
            }).toString();
            localStorage.setItem('session', session);
            dispatch(updateState(user));
        }
        console.log(rs);
        return rs;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const updateState = data => {
    return {
        type: types.UPDATE_USER,
        data
    }
}

export const logoutApi = () => {
    return httpRequest.postForm().then(res => {
        if (res.body.code === 200) {
            dispatch(logoutState(res.body.data));
        }
        return res;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const logoutState = () => {
    localStorage.setItem('session', '');
    return {
        type: types.LOGOUT
    }
}

