import * as MessagesConstants from "constants/Messages";

export const Get_List_Messages_Request = (IsWaiting) => {
    return {
        type: MessagesConstants.GET_MESSAGES_FRIEND_REQUEST,
        payload: IsWaiting,
    };
};

export const Get_List_Messages_Success = (IsWaiting) => {
    return {
        type: MessagesConstants.GET_MESSAGES_FRIEND_SUCCESS,
        payload: IsWaiting,
    };
};

export const Get_List_Messages_Error = (IsWaiting) => {
    return {
        type: MessagesConstants.GET_MESSAGES_FRIEND_ERROR,
        payload: IsWaiting,
    };
};

export const Send_Message_Request = (IsWaiting) => {
    return {
        type: MessagesConstants.SEND_MESSAGES_FRIEND_REQUEST,
        payload: IsWaiting,
    };
};

export const Send_Message_Success = (IsWaiting) => {
    return {
        type: MessagesConstants.SEND_MESSAGES_FRIEND_SUCCESS,
        payload: IsWaiting,
    };
};

export const Send_Message_Error = (IsWaiting) => {
    return {
        type: MessagesConstants.SEND_MESSAGES_FRIEND_ERROR,
        payload: IsWaiting,
    };
};

export const Receive_Message_Request = (IsWaiting) => {
    return {
        type: MessagesConstants.RECEIVE_MESSAGES_FRIEND_REQUEST,
        payload: IsWaiting,
    };
};

export const Receive_Message_Success = (IsWaiting) => {
    return {
        type: MessagesConstants.RECEIVE_MESSAGES_FRIEND_SUCCESS,
        payload: IsWaiting,
    };
};

export const Receive_Message_Error = (IsWaiting) => {
    return {
        type: MessagesConstants.RECEIVE_MESSAGES_FRIEND_ERROR,
        payload: IsWaiting,
    };
};