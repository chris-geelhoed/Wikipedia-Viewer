export function loadingStartupData() {
    return {
        type: "LOADING_STARTUP_DATA",
    }
}

export function startupDataError(error) {
    return {
        type: "STARTUP_DATA_ERROR",
        payload: {
            error: error
        }
    }
}

export function receivedOneStartupData() {
    return {
        type: "RECEIVED_ONE_STARTUP_DATA"
    }
}

export function receivedAllStartupData(data) {
    return {
        type: "RECEIVED_ALL_STARTUP_DATA",
        payload: {
            data: data
        }
    }
}