import * as GetMeConstants from "constants/GetMe";

export const Get_Me_Request = (data) => {
    return {
        type: GetMeConstants.GET_ME_REQUEST,
        payload: data,
    };
};

export const Get_Me_Success = (data) => {
    return {
        type: GetMeConstants.GET_ME_SUCCESS,
        payload: data,
    };
};

export const Reset_Me = () => {
    return {
        type: GetMeConstants.GET_ME_RESET,
    };
};
export const Sign_Out = (history) => {
    return {
        type: GetMeConstants.SIGN_OUT,
        payload: history,
    };
};

export const Add_Friend_To_Array = (data) => {
    return {
        type: GetMeConstants.ADD_FRIEND_TO_ARRAY,
        payload: data,
    };
};
