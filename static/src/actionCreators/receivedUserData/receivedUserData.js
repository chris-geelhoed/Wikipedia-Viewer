import jump from 'jump.js';

export function loadingUserData() {
    return {
        type: "LOADING_USER_DATA",
    }
}

export function userDataError(error) {
    return {
        type: "USER_DATA_ERROR",
        payload: {
            error: error
        }
    }
}

export function receivedUserData() {
    /*scroll to the top of the page once the search data is loaded*/
    jump(".search", {
        offset: -200
    });
    return {
        type: "RECEIVED_USER_DATA"
    }
}

export function submitUserData(data) {
    return {
        type: "SUBMIT_USER_DATA",
        payload: {
            data: data
        }
    }
}