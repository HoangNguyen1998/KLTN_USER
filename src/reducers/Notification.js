import * as NotifiConstants from "constants/Notification";
import GetToken from "helpers/GetToken";
import {stat} from "fs";

const initialState = {
    Count: 0,
    Notifications: [],
};
const reducer = (state = initialState, action) => {
    var index = null;
    switch (action.type) {
        // nhan loi moi ket ban
        case NotifiConstants.ADD_NOTIFI: {
            console.log(action);
            const {type, id, listUser} = action.payload;
            index = listUser.findIndex((item) => item._id === id);
            console.log(listUser)
            return {
                ...state,
                Notifications: [
                    ...state.Notifications,
                    {type: type, username: listUser[index].username},
                ],
                Count: state.Count + 1,
            };
        }
        case NotifiConstants.DELETE_COUNT: {
            return {
                ...state,
                Count: 0,
            };
        }
        default:
            return state;
    }
};

export default reducer;
