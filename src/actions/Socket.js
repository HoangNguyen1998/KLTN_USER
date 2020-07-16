import * as SocketConstants from "constants/Socket";

export const Connect_Socket = () => {
    return {
        type: SocketConstants.CONNECT_SOCKET,
    };
};

export const DisConnect_Socket = () => {
    return {
        type: SocketConstants.DISCONNECT_SOCKET,
    };
};