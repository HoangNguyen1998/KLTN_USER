import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import * as FriendsActions from "actions/Friends";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import {isEmpty} from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
const list = [{name: "Hoang"}, {name: "Lam"}];

const ListReceive = (props) => {
    const {socket} = props;
    const dispatch = useDispatch();
    const listRequestRedux = useSelector((state) => state.Friends.listRequest);
    const listFriendsRedux = useSelector((state) => state.Friends.listFriends);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    // const socket = useSelector((state) => state.Socket.socket);
    console.log(socket);
    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.on("authenticate", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("emitAcceptAddFriend", (res) => {
                console.log("lang nghe: ", getMeRedux);
                if (getMeRedux) {
                    console.log("id trang local: ", getMeRedux._id);
                    console.log("id tra ve tu socket: ", res.userSender);
                    if (getMeRedux._id !== res.userSender) {
                        console.log("Vao duoc day de push thong bao");
                        dispatch(
                            FriendsActions.Emit_Accept_Add_Friend(
                                res.userSender
                            )
                        );
                    }
                }
            });
            return () => {
                console.log("componentunmount")
                socket.removeEventListener("emitAcceptAddFriend");
            };
        }
    });
    // FUNC
    const acceptFriend = (username, id) => () => {
        if (!isEmpty(socket)) {
            socket.emit(
                "onAcceptAddFriend",
                {senderId: id, senderName: username},
                () => {
                    console.log("accept success");
                    dispatch(FriendsActions.On_Accept_Add_Friend(id));
                }
            );
        }
    };
    const renderListAdd = (data) => {
        if (!data) {
            return (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            );
        }
        if (data) {
            if (data.length !== 0) {
                return data.map((item, index) => {
                    return (
                        <div className="col2__list-user-container">
                            <div className="col2__list-user-container__item-container">
                                <div className="col1__item-container__info">
                                    <div className="col1__item-container__info__image"></div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                                <div className="col2__list-user-container__item-container__action-container">
                                    <div className="col2__list-user-container__item-container__action-container__action">
                                        Detail
                                    </div>
                                    <div
                                        onClick={acceptFriend(
                                            item.username,
                                            item._id
                                        )}
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Accept
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    return (
        <Grid item xs={12} lg={12}>
            {renderListAdd(listRequestRedux)}
        </Grid>
    );
};

export default ListReceive;
