import * as FriendsConstants from "constants/Friends";

export const Get_List_Friends_Request = (IsWaiting) => {
    return {
        type: FriendsConstants.GET_LIST_FRIENDS_REQUEST,
        payload: IsWaiting,
    };
};

export const Get_List_Friends_Error = (errors) => {
    return {
        type: FriendsConstants.GET_LIST_FRIENDS_ERROR,
        payload: errors,
    };
};

export const Get_List_Friends_Success = (data) => {
    return {
        type: FriendsConstants.GET_LIST_FRIENDS_SUCCESS,
        payload: data,
    };
};

export const Get_List_Users_Request = (IsWaiting) => {
    return {
        type: FriendsConstants.GET_LIST_USERS_REQUEST,
        payload: IsWaiting,
    };
};

export const Get_List_Users_Error = (errors) => {
    return {
        type: FriendsConstants.GET_LIST_USERS_ERROR,
        payload: errors,
    };
};

export const Get_List_Users_Success = (data) => {
    return {
        type: FriendsConstants.GET_LIST_USERS_SUCCESS,
        payload: data,
    };
};

// export const Get_Challenge_Details_Request = (id, setIsWaiting) => {
//     return {
//         type: FriendsConstants.GET_CHALLENGE_DETAILS_REQUEST,
//         payload: {id, setIsWaiting},
//     };
// };
// export const Get_Challenge_Details_Success = (success) => {
//     return {
//         type: FriendsConstants.GET_CHALLENGE_DETAILS_SUCCESS,
//         payload: success,
//     };
// };
// export const Get_Challenge_Details_Error = (error) => {
//     return {
//         type: FriendsConstants.GET_CHALLENGE_DETAILS_ERROR,
//         payload: error,
//     };
// };

// export const Get_Comments = (comments) => {
//     return {type: FriendsConstants.GET_COMMENTS_SUCCESS, payload: comments};
// };
