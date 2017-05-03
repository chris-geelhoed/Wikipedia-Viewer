export function loadingNewLocationData() {
    return {
        type: "LOADING_NEW_LOCATION_DATA",
    }
}

export function newLocationDataError(error) {
    return {
        type: "NEW_LOCATION_DATA_ERROR",
        payload: {
            error: error
        }
    }
}

export function receivedNewLocationData(data) {
    return {
        type: "RECEIVED_NEW_LOCATION_DATA",
        payload: {
            data: data
        }
    }
}
