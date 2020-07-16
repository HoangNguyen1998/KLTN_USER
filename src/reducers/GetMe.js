import * as GetMeConstants from "constants/GetMe";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GetMeConstants.GET_ME_SUCCESS:
            return {...state, user: action.payload};
        case GetMeConstants.GET_ME_RESET:
            return {...state}
        case GetMeConstants.SIGN_OUT:
            return {...state}
        default:
            return {...state};
    }
};

export default reducer;
