import axios from 'axios';
import {loadingUserData, userDataError, receivedUserData, submitUserData} from '../receivedUserData/receivedUserData.js';
import url from '../API_URL.js';

export default function(query) {
    console.log("query from action creator: ", query);
    return function(dispatch) {
        dispatch({
            type: "SUBMITTED_SEARCH"
        });
        dispatch(loadingUserData());
        axios.get(`${url}/search`, {
            params: {
                query: query
            }
        }).then(function(response) {
            console.log("axios success!");
            const delay = 300;
            dispatch(receivedUserData());
            setTimeout(_ => {
                dispatch(submitUserData(response.data));
            }, delay);
        });
    }
}