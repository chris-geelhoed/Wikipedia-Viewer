export default function(query) {
    return {
        type: "CHANGED_SEARCH",
        payload: {
            query: query
        }
    }
}