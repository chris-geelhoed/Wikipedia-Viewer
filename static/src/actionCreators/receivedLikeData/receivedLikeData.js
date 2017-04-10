export function loadingLikeData() {
    return {
        type: "LOADING_LIKE_DATA",
    }
}

export function likeDataError(error) {
    return {
        type: "LIKE_DATA_ERROR",
        payload: {
            error: error
        }
    }
}

export function receivedLikeData(data) {
    return {
        type: "RECEIVED_LIKE_DATA",
        payload: {
            data: data
        }
    }
}
