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