// lang nghe ban be online
const on_EmitFriendOnline = (socket) => {
    socket.on("emitFriendOnline", (data) =>
        console.log("xem ban be co online ko? ", data)
    );
};

export const socket = {
    on_EmitFriendOnline,
};
