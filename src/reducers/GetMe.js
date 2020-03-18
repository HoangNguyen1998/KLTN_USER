import * as GetMeConstants from "constants/GetMe";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GetMeConstants.GET_ME_SUCCESS:
            console.log(action.data);
            return {...state, user: action.payload};
        case GetMeConstants.GET_ME_RESET:
            return {}
        default:
            return {...state};
    }
};

export default reducer;
