import * as FriendsConstants from "constants/Friends";
import * as GetMeConstants from "constants/GetMe";

const reducer = (
    state = {listFriends: [], listRequest: [], listAdd: [], listUsers: []},
    action
) => {
    var index = null;
    var data = null;
    switch (action.type) {
        case FriendsConstants.GET_LIST_FRIENDS_REQUEST:
            return {...state};

        case FriendsConstants.GET_LIST_FRIENDS_SUCCESS:
            return {...state};

        case FriendsConstants.GET_LIST_USERS_SUCCESS:
            const {payload} = action;
            return {...state, listUsers: payload};

        case FriendsConstants.ADD_FRIEND_REQUEST:
            data = [...state.listUsers];
            index = data.findIndex((item) => item._id === action.payload);
            const addFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listUsers: data,
                listAdd: [...state.listAdd, addFriend],
            };

        case FriendsConstants.GET_LIST_ADD_FRIEND_SUCCESS:
            return {...state, listAdd: action.payload};

        case FriendsConstants.REJECT_ADD_FRIEND_REQUEST:
            data = [...state.listAdd];
            index = data.findIndex((item) => item._id === action.payload);
            const rejectFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listUsers: [...state.listUsers, rejectFriend],
                listAdd: data,
            };

        case FriendsConstants.GET_LIST_REQUEST_FRIEND_SUCCESS:
            return {...state, listRequest: action.payload};

        case FriendsConstants.ACCEPT_REQUEST_FRIEND_REQUEST:
            return {...state};

        case GetMeConstants.SIGN_OUT:
            return {
                ...state,
                listFriends: [],
                listRequest: [],
                listAdd: [],
                listUsers: [],
            };

        case FriendsConstants.REQUEST_FRIEND_REQUEST:
            data = [...state.listUsers];
            index = data.findIndex((item) => item._id === action.payload);
            const requestFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listUsers: data,
                listRequest: [...state.listRequest, requestFriend],
            };

        case FriendsConstants.EMIT_REJECT_ADD_FRIEND:
            data = [...state.listRequest];
            index = data.findIndex((item) => item._id === action.payload);
            const emitRejectFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listRequest: data,
                listUsers: [...state.listUsers, emitRejectFriend],
            };

        case FriendsConstants.ON_ACCEPT_ADD_FRIEND:
            data = [...state.listRequest];
            index = data.findIndex((item) => item._id === action.payload);
            const onAcceptFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listRequest: data,
                listFriends: [...state.listFriends, onAcceptFriend],
            };

        case FriendsConstants.EMIT_ACCEPT_ADD_FRIEND:
            data = [...state.listAdd];
            index = data.findIndex((item) => item._id === action.payload);
            const emitAcceptFriend = data[index];
            data.splice(index, 1);
            return {
                ...state,
                listAdd: data,
                listFriends: [...state.listFriends, emitAcceptFriend],
            };
        default:
            return {...state};
    }
};

export default reducer;
