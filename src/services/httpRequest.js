import superagent from 'superagent';
import { APPNAME, PLATFORM, HOST } from './Constants';
import * as func from '../utils/Utils';

const httpRequest = {
    post: (url, params, token) => {
        if (token) {
            return superagent.post(url).set('Authentication', token).send(params);
        } else {
            return superagent.post(url).send(params);
        }
    },

    get: (url, params, token) => {
        if (token) {
            return superagent.get(url).set('Authentication', token).query(params);
        } else {
            return superagent.get(url).query(params);
        }
    },

    postForm: (url, params, token) => {
        let data = func.aesEncrypt({ ...params, platform: PLATFORM }).toString();
        return superagent.post(HOST + url).type('form').send({ app: APPNAME, data });
    }
}

export default httpRequest;
