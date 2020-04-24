import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as FriendsActions from "actions/Friends";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import MessageIcon from "@material-ui/icons/Message";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import CallApi from "helpers/ApiCaller";

const SearchFriends = (props) => {
    const dispatch = useDispatch();
    // const {socket} = props;
    const [listNotFriend, setListNotFriend] = useState([]);
    const socket = useSelector((state) => state.Socket.socket);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    useEffect(() => {
        if (socket) {
            socket.on("authenticate", (data) => {
                console.log(data);
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                console.log(data);
                alert(JSON.stringify(data));
            });
            socket.on("emitAddFriend", (res) => {
                console.log("Lang nghe su kien nay: ", res.userSender)
                if (getMeRedux) {
                    if (getMeRedux._id !== res.userSender) {

                        dispatch(
                            FriendsActions.Request_Friend_Request(res.userSender)
                        );
                    }
                }
            });
            return () => socket.removeEventListener("emitAddFriend");
        }
    },[usersRedux]);
    useEffect(() => {
        getListNotFriend();
    }, []);

    // CALL API
    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
    }, []);

    // SOCKET
    // useEffect(() => {
    //     console.log("Jegfgdgfgfdg")
    //     if (socket) {
    //         socket.on("emitAddFriend", (res) => {
    //             if (getMeRedux) {
    //                 if (getMeRedux._id !== res.userSender) {
    //                     dispatch(
    //                         FriendsActions.Add_Friend_Request(res.userSender)
    //                     );
    //                 }
    //             }
    //         });
    //     }
    // }, [socket]);
    // FUNC
    const addFriend = (username, id) => () => {
        if (socket) {
            socket.emit(
                "onAddFriend",
                {receiverId: id, receiverName: username},
                () => dispatch(FriendsActions.Add_Friend_Request(id))
            );
        }
    };
    const getListNotFriend = async () => {
        const res = await CallApi("users/notFriend", "GET", null);
        console.log(res);
        setListNotFriend(res.data);
    };
    const renderListUsers = (data) => {
        console.log(data);
        if (data.length === 0) {
            return <CircularProgress className="loading-container" />;
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
                                        onClick={addFriend(
                                            item.username,
                                            item._id
                                        )}
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Add
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            } else {
                return <div>Ban khong co nguoi ban nao</div>;
            }
        }
    };
    return (
        <Grid item xs={12} lg={4}>
            <div className="col2">
                <div className="col2__search-friend-header">
                    Nhung nguoi ban co the biet
                </div>
                <div className="col2__search-container">
                    <TextField
                        fullWidth
                        placeholder="Search friend"
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                </div>
                {renderListUsers(usersRedux)}
            </div>
        </Grid>
    );
};

export default SearchFriends;
