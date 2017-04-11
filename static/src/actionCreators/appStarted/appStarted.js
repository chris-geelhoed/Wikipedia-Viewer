import axios from 'axios';
import {
    loadingStartupData,
    startupDataError,
    receivedOneStartupData,
    receivedAllStartupData
} from '../receivedStartupData/receivedStartupData.js';
import url from '../API_URL.js';
import startupData from '../../startupData.js';

export default function () {
    console.log("app has started!");
    return function (dispatch) {
        dispatch(loadingStartupData());
        const requests = ["fetchNearYou", "fetchWorldwide", "fetchPopular", "fetchMostLiked"].map(endpoint => {
            return axios.get(`${url}/${endpoint}`);
        });
        requests.forEach(req => {
            req.then(_ => dispatch(receivedOneStartupData()));
        });
        axios.all(requests).then(axios.spread((nearYou, worldwide, popular, mostLiked) => {
            //small delay added to allow the user to see the progress bar complete
            const delay = 300;
            setTimeout(function () {
                dispatch(receivedAllStartupData({
                    nearYou: nearYou.data,
                    worldwide: worldwide.data,
                    popular: popular.data,
                    mostLiked: mostLiked.data
                }));
            }, delay);
        })).catch(error => {
            dispatch(startupDataError(error));
        });
    }
}