const initialDropdownState = {
    open: false
}

const dropdownReducer = (state = initialDropdownState, action) => {
    switch (action.type) {
        case "CLICKED_DROPDOWN":
            state = {
                ...state,
                open: !state.open,
            }
            break;
        case "CLICKED_DROPDOWN_ITEM":
            state = {
                ...state,
                open: false
            }
            break;
        default:
            break;
    }
    return state;
}

export default dropdownReducer;