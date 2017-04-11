const initialDataState = {
    userSearch: [],
    nearYou: [
        /*
        {
            title: "cookie1",
            extract: "this is the first cookie i think it is pretty small",
            thumbnail: "http://images.media-allrecipes.com/userphotos/560x315/1107530.jpg"
        },
        {
            title: "cookie2",
            extract: "this is the second cookie i think it is pretty big",
            thumbnail: "https://www.kfc.com/assets/products/G15022_KFC_83-dozen-cookies-Enviro_1291_RGB-copy-3c79d7ef6ea6f6afbc31347a8419e6229ebbfb347b8396f3d05fff5343c36dbf.jpg"
        },
        {
            title: "cookie3",
            extract: "this is the third cookie i think it is pretty big",
            thumbnail: "https://cdn1.pri.org/sites/default/files/story/images/cookies733.jpg"
        },
        {
            title: "drake",
            extract: "drake is my good homie",
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Drake_and_Future_2016_Summer_Sixteen_Tour.jpg/800px-Drake_and_Future_2016_Summer_Sixteen_Tour.jpg"
        }
        */
    ],
    worldwide: [
        /*
        {
            title: "cookie1",
            extract: "this is the first cookie i think it is pretty small",
            thumbnail: "http://images.media-allrecipes.com/userphotos/560x315/1107530.jpg"
        },
        {
            title: "cookie2",
            extract: "this is the second cookie i think it is pretty big",
            thumbnail: "https://www.kfc.com/assets/products/G15022_KFC_83-dozen-cookies-Enviro_1291_RGB-copy-3c79d7ef6ea6f6afbc31347a8419e6229ebbfb347b8396f3d05fff5343c36dbf.jpg"
        },
        {
            title: "cookie3",
            extract: "this is the third cookie i think it is pretty big",
            thumbnail: "https://cdn1.pri.org/sites/default/files/story/images/cookies733.jpg"
        },
        {
            title: "drake",
            extract: "drake is my good homie",
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Drake_and_Future_2016_Summer_Sixteen_Tour.jpg/800px-Drake_and_Future_2016_Summer_Sixteen_Tour.jpg"
        }
        */
    ],
    popular: [
        /*
        {
            title: "cookie1",
            extract: "this is the first cookie i think it is pretty small",
            thumbnail: "http://images.media-allrecipes.com/userphotos/560x315/1107530.jpg"
        },
        {
            title: "cookie2",
            extract: "this is the second cookie i think it is pretty big",
            thumbnail: "https://www.kfc.com/assets/products/G15022_KFC_83-dozen-cookies-Enviro_1291_RGB-copy-3c79d7ef6ea6f6afbc31347a8419e6229ebbfb347b8396f3d05fff5343c36dbf.jpg"
        },
        {
            title: "cookie3",
            extract: "this is the third cookie i think it is pretty big",
            thumbnail: "https://cdn1.pri.org/sites/default/files/story/images/cookies733.jpg"
        },
        {
            title: "drake",
            extract: "drake is my good homie",
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Drake_and_Future_2016_Summer_Sixteen_Tour.jpg/800px-Drake_and_Future_2016_Summer_Sixteen_Tour.jpg"
        }
        */
    ],
    mostLiked: [],
    progress: 0,
    loading: false,
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
                progress: state.progress + 25
            }
            break;
        case "RECEIVED_ALL_STARTUP_DATA":
            console.log("got the startup data!", action);
            state = {
                ...state,
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
            console.log("loading like data");
            break;
        case "LIKE_DATA_ERROR":
            console.log(action);
            break;
        case "RECEIVED_LIKE_DATA":
            console.log("action", action);
            console.log("initial state", state);
            state = Object.assign({}, state, action.payload.data);
            break;
        default:
            break;
    }
    return state;
}

export default dataReducer;