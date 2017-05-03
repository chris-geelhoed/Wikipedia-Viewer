import axios from 'axios';
import {
    loadingNewLocationData,
    newLocationDataError,
    receivedNewLocationData
} from '../receivedNewLocationData/receivedNewLocationData.js';
import url from '../API_URL.js';

export default function (coords) {
    return function (dispatch) {
        dispatch(loadingNewLocationData());
        axios.get(`${url}/fetchNewLocationData`, {
            params: {
                lat: coords.lat,
                long: coords.long,
            }
        }).then(function (response) {
            console.log(response.data);
            dispatch(receivedNewLocationData(response.data));
        }).catch(function (error) {
            dispatch(newLocationDataError(error));
        });
    }
}