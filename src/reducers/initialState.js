import * as func from '../utils/Utils';

let user = localStorage.getItem('session');
if (user) {
    user = func.aesDecrypt(user);
} else {
    user = {
        user: null,
        token: ''
    }
}

export default {
    app: {
        language: 'vi',
        loading: false
    },
    user: user
};
