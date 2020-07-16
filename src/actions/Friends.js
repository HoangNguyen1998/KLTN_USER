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

export const Add_Friend_Request = (data) => {
    return {
        type: FriendsConstants.ADD_FRIEND_REQUEST,
        payload: data,
    };
};

export const Add_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.ADD_FRIEND_ERROR,
        payload: errors,
    };
};

export const Add_Friend_Success = (data) => {
    return {
        type: FriendsConstants.ADD_FRIEND_SUCCESS,
        payload: data,
    };
};

export const Get_List_Add_Friend_Request = (data) => {
    return {
        type: FriendsConstants.GET_LIST_ADD_FRIEND_REQUEST,
        payload: data,
    };
};

export const Get_List_Add_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.GET_LIST_ADD_FRIEND_ERROR,
        payload: errors,
    };
};

export const Get_List_Add_Friend_Success = (data) => {
    return {
        type: FriendsConstants.GET_LIST_ADD_FRIEND_SUCCESS,
        payload: data,
    };
};

export const Get_List_Request_Friend_Request = (data) => {
    return {
        type: FriendsConstants.GET_LIST_REQUEST_FRIEND_REQUEST,
        payload: data,
    };
};

export const Get_List_Request_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.GET_LIST_REQUEST_FRIEND_ERROR,
        payload: errors,
    };
};

export const Get_List_Request_Friend_Success = (data) => {
    return {
        type: FriendsConstants.GET_LIST_REQUEST_FRIEND_SUCCESS,
        payload: data,
    };
};

export const Reject_Add_Friend_Request = (data) => {
    return {
        type: FriendsConstants.REJECT_ADD_FRIEND_REQUEST,
        payload: data,
    };
};

export const Reject_Add_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.REJECT_ADD_FRIEND_ERROR,
        payload: errors,
    };
};

export const Reject_Add_Friend_Success = (data) => {
    return {
        type: FriendsConstants.REJECT_ADD_FRIEND_SUCCESS,
        payload: data,
    };
};

export const Accept_Request_Friend_Request = (data) => {
    return {
        type: FriendsConstants.ACCEPT_REQUEST_FRIEND_REQUEST,
        payload: data,
    };
};

export const Accept_Request_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.ACCEPT_REQUEST_FRIEND_ERROR,
        payload: errors,
    };
};

export const Accept_Request_Friend_Success = (data) => {
    return {
        type: FriendsConstants.ACCEPT_REQUEST_FRIEND_SUCCESS,
        payload: data,
    };
};

export const Request_Friend_Request = (data) => {
    return {
        type: FriendsConstants.REQUEST_FRIEND_REQUEST,
        payload: data,
    };
};

export const Request_Friend_Error = (errors) => {
    return {
        type: FriendsConstants.REQUEST_FRIEND_ERROR,
        payload: errors,
    };
};

export const Emit_Reject_Add_Friend = (data) => {
    return {
        type: FriendsConstants.EMIT_REJECT_ADD_FRIEND,
        payload: data,
    };
};

export const Emit_Accept_Add_Friend = (data) => {
    return {
        type: FriendsConstants.EMIT_ACCEPT_ADD_FRIEND,
        payload: data,
    };
};

export const On_Accept_Add_Friend = (data) => {
    return {
        type: FriendsConstants.ON_ACCEPT_ADD_FRIEND,
        payload: data,
    };
};
