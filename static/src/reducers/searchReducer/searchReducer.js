const initialSearchState = {
    query: "",
    lastQuery: "",
}

const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case "CHANGED_SEARCH":
            state = {
                ...state,
                query: action.payload.query,
            }
            break;
        case "SUBMITTED_SEARCH":
            console.log("search submitted");
            state = {
                ...state,
                lastQuery: state.query,
            }
            break;
        default:
            break;
    }
    return state;
}

export default searchReducer;