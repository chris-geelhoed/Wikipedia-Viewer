const initialDataState = {
    location: {
        address: "",
        coords: {},
    },
    userSearch: [],
    nearYou: [],
    worldwide: [],
    popular: [],
    mostLiked: [],
    progress: 0,
    loading: false,
    loadingLikeData: false,
    loadingLocation: false,
    loadingNewLocation: false,
}

const dataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case "APP_STARTED":
            console.log("app has started!");
            break;
        case "LOADING_STARTUP_DATA":
            console.log("app is loading!");
            state = {
                ...state,
                progress: 0,
                loading: true
            }
            break;
        case "STARTUP_DATA_ERROR":
            console.log("error loading startup data!");
            break;
        case "RECEIVED_ONE_STARTUP_DATA":
            state = {
                ...state,
                progress: state.progress + 20
            }
            break;
        case "RECEIVED_ALL_STARTUP_DATA":
            console.log("got the startup data!", action);
            state = {
                ...state,
                location: action.payload.data.location,
                nearYou: action.payload.data.nearYou,
                worldwide: action.payload.data.worldwide,
                popular: action.payload.data.popular,
                mostLiked: action.payload.data.mostLiked,
                loading: false
            }
            break;
        case "LOADING_USER_DATA":
            state = {
                ...state,
                progress: 0,
                loading: true
            }
            console.log("loading...");
            break;
        case "USER_DATA_ERROR":
            console.log(action);
            break;
        case "RECEIVED_USER_DATA":
            state = {
                ...state,
                progress: 100
            }
            break;
        case "SUBMIT_USER_DATA":
            console.log("got the user data", action.payload.data.userSearch);
            state = {
                ...state,
                loading: false,
                userSearch: action.payload.data.userSearch
            }
            break;
        case "LOADING_LIKE_DATA":
            state = {
                ...state,
                loadingLikeData: true,
            }
            break;
        case "LIKE_DATA_ERROR":
            console.log(action);
            state = {
                ...state,
                loadingLikeData: false,
            }
            break;
        case "RECEIVED_LIKE_DATA":
            console.log("action", action);
            state = Object.assign({}, state, action.payload.data, {
                loadingLikeData: false,
            });
            break;
        case "NEW_LOCATION_DATA_ERROR":
            console.log(action);
            state = {
                ...state,
                loadingNewLocation: false,
            }
            break;
        case "LOADING_NEW_LOCATION_DATA":
            console.log("loading new location data");
            state = {
                ...state,
                loadingNewLocation: true,
            }
            break;
        case "RECEIVED_NEW_LOCATION_DATA":
            console.log("new location data", action);
            state = {
                ...state,
                location: Object.assign({}, state.location, {
                    address: action.payload.data.address
                }),
                nearYou: action.payload.data.nearYou,
                loadingNewLocation: false,
            }
            break;
        default:
            break;
    }
    return state;
}

export default dataReducer;