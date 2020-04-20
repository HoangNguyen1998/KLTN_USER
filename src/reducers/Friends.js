import * as FriendsConstants from "constants/Friends";

const reducer = (state = {listFriends: [], listUsers: []}, action) => {
    switch (action.type) {
        case FriendsConstants.GET_LIST_FRIENDS_REQUEST:
            return {...state};
        case FriendsConstants.GET_LIST_FRIENDS_SUCCESS:
            return {...state}
        case FriendsConstants.GET_LIST_USERS_SUCCESS: 
            const {payload}=action
            return {...state, listUsers: payload}
        default:
            return {...state};
    }
};

export default reducer;
