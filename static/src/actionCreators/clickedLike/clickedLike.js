import axios from 'axios';
import _ from 'lodash';
import {
    loadingLikeData,
    likeDataError,
    receivedLikeData
} from '../receivedLikeData/receivedLikeData.js';
import url from '../API_URL.js';

export default function ({page, wikiData}) {
    return function (dispatch) {
        console.log("data", page, wikiData);
        const pageTitle = page.title;
        dispatch(loadingLikeData());
        axios.get(`${url}/like`, {
            params: {
                title: pageTitle,
                likes: page.likes,
                page: page,
            }
        }).then(function (response) {
            const data = _.mapValues(wikiData, val => {
                if(response.data && response.data.likes && val[0] && val[0].thumbnail) {
                    return val.map(page => {
                        return page.title === pageTitle ?
                        Object.assign({}, page, {
                            likes: response.data.likes
                        }) : page;
                    });
                }
                return val;
            });
            console.log("new data", data);
            dispatch(receivedLikeData(data));
        }).catch(function (error) {
            dispatch(likeDataError(error));
        });
    }
}