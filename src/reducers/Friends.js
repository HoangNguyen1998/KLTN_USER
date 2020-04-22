import * as FriendsConstants from "constants/Friends";

const reducer = (
    state = {listFriends: [], listRequest: [], listAdd: [], listUsers: []},
    action
) => {
    switch (action.type) {
        case FriendsConstants.GET_LIST_FRIENDS_REQUEST:
            return {...state};
        case FriendsConstants.GET_LIST_FRIENDS_SUCCESS:
            return {...state};
        case FriendsConstants.GET_LIST_USERS_SUCCESS:
            const {payload} = action;
            return {...state, listUsers: payload};
        case FriendsConstants.ADD_FRIEND_REQUEST:
            const {userSender, userSenderName} = action.payload;
            const data = [...state.listUsers];
            const index = data.findIndex((item) => item._id === userSender);
            data.splice(index, 1);
            return {...state, listUsers: data};
        default:
            return {...state};
    }
};

export default reducer;
