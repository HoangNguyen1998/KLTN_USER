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
import {isEmpty} from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import CallApi from "helpers/ApiCaller";

const SearchFriends = (props) => {
    const dispatch = useDispatch();
    const {socket} = props;
    const [listNotFriend, setListNotFriend] = useState([]);
    const [txtSearch, setTxtSearch] = useState("");
    const [listUsers, setListUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    // const socket = useSelector((state) => state.Socket.socket);
    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.on("authenticate", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("emitAddFriend", (res) => {
                if (getMeRedux) {
                    if (getMeRedux._id !== res.userSender) {
                        dispatch(
                            FriendsActions.Request_Friend_Request(
                                res.userSender
                            )
                        );
                    }
                }
            });
            return () => socket.removeEventListener("emitAddFriend");
        }
    });

    useEffect(() => {
        getListNotFriend();
    }, []);

    // CALL API
    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
    }, []);

    // FUNC
    const searchUser = (value) => {
        console.log(value);
        const data = usersRedux.filter((item) =>
            item.username.toLowerCase().includes(value.toLowerCase())
        );
        console.log(data);
        setListUsers(data);
        if (value !== "") {
            setIsSearch(true);
        } else {
            setIsSearch(false);
        }
    };
    const removeInSearchUser = (id) => {
        const data = listUsers;
        const index = listUsers.findIndex((item) => item._id === id);
        data.splice(index, 1);
        setListUsers(data);
    };
    const addFriend = (username, id) => {
        if (!isEmpty(socket)) {
            console.log("username: ", username, " ", id);
            socket.emit(
                "onAddFriend",
                {receiverId: id, receiverName: username},
                () => dispatch(FriendsActions.Add_Friend_Request(id))
            );
        }
    };
    const getListNotFriend = async () => {
        const res = await CallApi("users/notFriend", "GET", null);
        setListNotFriend(res.data);
    };

    const renderListSearchUsers = (data) => {
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
                                        onClick={() => {
                                            removeInSearchUser(item._id);
                                            addFriend(item.username, item._id);
                                        }}
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Add
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };

    const renderListUsers = (data) => {
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
                                        onClick={() =>
                                            addFriend(item.username, item._id)
                                        }
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Add
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
            <div className={`col2`}>
                <div className="col2__search-container">
                    <TextField
                        value={txtSearch}
                        fullWidth
                        placeholder="Search friend"
                        onChange={(e) => {
                            setTxtSearch(e.target.value);
                            searchUser(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                </div>
                {isSearch
                    ? renderListSearchUsers(listUsers)
                    : renderListUsers(usersRedux)}
            </div>
        </Grid>
    );
};

export default SearchFriends;
