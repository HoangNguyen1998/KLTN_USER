import * as SocketConstants from "constants/Socket";
import socketIOClient from "socket.io-client";
import getToken from "helpers/GetToken";
import * as GetMeConstants from "constants/GetMe";

const reducer = (state = {socket: {}}, action) => {
    switch (action.type) {
        case SocketConstants.CONNECT_SOCKET: {
            let socket = socketIOClient.connect(
                "https://learn-jp-kltn.herokuapp.com",
                {
                    query: "token=" + getToken(),
                }
            );
            return {
                ...state,
                socket,
            };
        }
        case SocketConstants.DISCONNECT_SOCKET:
            return {
                ...state,
                socket: {},
            };
        case GetMeConstants.SIGN_OUT:
            return {
                ...state,
                socket: {},
            };
        default:
            return state;
    }
};

export default reducer;
