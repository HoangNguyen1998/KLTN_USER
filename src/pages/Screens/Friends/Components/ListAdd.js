import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import * as FriendsActions from "actions/Friends";
import DeleteIcon from "@material-ui/icons/Delete";
import {isEmpty} from "lodash";
import MessageIcon from "@material-ui/icons/Message";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
const list = [{name: "Hoang"}, {name: "Lam"}];

const ListFriends = (props) => {
    // const {socket} = props;
    const dispatch = useDispatch();
    const listAddRedux = useSelector((state) => state.Friends.listAdd);
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const socket = useSelector((state) => state.Socket.socket);
    useEffect(() => {
        if (!isEmpty(socket)) {
            // console.log("hello mother fucker ")
            socket.on("authenticate", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("emitRejectAddFriend", (res) => {
                console.log("ccccccccccccccccc", res.userSender);
                if (getMeRedux) {
                    if (getMeRedux._id !== res.userSender) {
                        dispatch(
                            FriendsActions.Emit_Reject_Add_Friend(
                                res.userSender
                            )
                        );
                    }
                }
            });
            return () => socket.removeEventListener("emitRejectAddFriend");
        }
    });
    // FUNC
    const rejectFriend = (id) => () => {
        if (!isEmpty(socket)) {
            socket.emit("onRejectAddFriend", {receiverId: id}, () => {
                dispatch(FriendsActions.Reject_Add_Friend_Request(id));
            });
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
                                        onClick={rejectFriend(item._id)}
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Reject
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
        <Grid item xs={12} lg={4}>
            <div className=" list-friend-header">
                Danh sách gửi lời mời kết bạn
            </div>
            {renderListAdd(listAddRedux)}
        </Grid>
    );
};

export default ListFriends;
