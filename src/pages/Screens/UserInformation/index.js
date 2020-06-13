import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import * as FriendsActions from "actions/Friends";
import {Grid, TextField, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {Tabs, Radio} from "antd";
import {withRouter} from "react-router-dom";
import * as SocketActions from "actions/Socket";
import SearchFriends from "./Components/SearchFriends";
import * as GetMeActions from "actions/GetMe";
import ListSend from "./Components/ListSend";
import ListReceive from "./Components/ListReceive";
import ListFriends from "./Components/ListFriends";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Line} from "react-chartjs-2";
import moment from "moment";
import {isEmpty} from "lodash";
import CallApi from "helpers/ApiCaller";
import * as NotifiActions from "actions/Notification";
import "./styles.scss";

const {TabPane} = Tabs;
const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const UserInformation = (props) => {
    const {i18n, t} = useTranslation("translation");
    const user = useSelector((state) => {
        return state.GetMe.user;
    });
    const socket = useSelector((state) => state.Socket.socket);
    const dispatch = useDispatch();
    const [listNotFriend, setListNotFriend] = useState([]);
    const [txtSearch, setTxtSearch] = useState("");
    const [listUsers, setListUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const listAddRedux = useSelector((state) => state.Friends.listAdd);
    const listRequestRedux = useSelector((state) => state.Friends.listRequest);
    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
    }, []);
    useEffect(() => {
        if (isEmpty(socket)) {
            console.log("Hello");
            dispatch(SocketActions.Connect_Socket());
        }
        return () => {
            // console.log("Helooooooo")
            // if(socket){
            //     socket.removeAllListeners();
            // }
        };
    }, []);
    console.log(user);
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
                        console.log("Vao duoc day");
                        dispatch(
                            FriendsActions.Emit_Accept_Add_Friend(
                                res.userSender
                            )
                        );
                    }
                }
            });
            return () => {
                console.log("componentunmount");
                socket.removeEventListener("emitAcceptAddFriend");
            };
        }
    });
    // FUNC
    const acceptFriend1 = (username, id) => () => {
        if (!isEmpty(socket)) {
            socket.emit(
                "onAcceptAddFriend",
                {senderId: id, senderName: username},
                () => {
                    console.log("accept success");
                    dispatch(FriendsActions.On_Accept_Add_Friend(id));
                    dispatch(GetMeActions.Get_Me_Request());
                }
            );
        }
    };
    const renderListFriends = (data) => {
        if (!data) {
            return (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            );
        }
        if (data) {
            if (data.friends.length !== 0) {
                return data.friends.map((item, index) => {
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
                                        onClick={acceptFriend1(
                                            item.username,
                                            item._id
                                        )}
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Message
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
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
                        console.log("Vao duoc day");
                        dispatch(
                            FriendsActions.Emit_Accept_Add_Friend(
                                res.userSender
                            )
                        );
                        dispatch(GetMeActions.Get_Me_Request());
                    }
                }
            });
            return () => {
                console.log("componentunmount");
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
                    dispatch(GetMeActions.Get_Me_Request());
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
    const renderListSend = (data) => {
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
                        console.log("Hihi, bat dc roi nha", res.userSender);
                        dispatch(
                            NotifiActions.Add_Notifi({
                                type: "ReceiveAddFriendRequest",
                                id: res.userSender,
                                listUser: usersRedux,
                            })
                        );
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
        <div className="container">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <Paper elevation={3} className="col-avatar">
                        <div className="col-avatar__image">
                            <img src="https://picsum.photos/200" alt="Hihi" />
                        </div>
                        <div className="col-avatar__info">
                            <div>{t("UserName")}</div>
                            <div className="col-avatar__info__detail">
                                {user ? user.username : ""}
                            </div>
                        </div>
                        <div className="col-avatar__info">
                            <div>{t("Email")}</div>
                            <div className="col-avatar__info__detail">
                                {user ? user.email : ""}
                            </div>
                        </div>
                        <div className="col-avatar__info">
                            <div>{t("Friend")}</div>
                            <div className="col-avatar__info__detail">
                                {user ? user.friends.length : ""}
                            </div>
                        </div>
                        <div className="col-avatar__info">
                            <div>{t("Courses")}</div>
                            <div className="col-avatar__info__detail">
                                {user ? user.courses.length : ""}
                            </div>
                        </div>
                        <div className="col-avatar__info">
                            <div>{t("CreatedAt")}</div>
                            <div className="col-avatar__info__detail">
                                {user
                                    ? moment(user.createdAt).format("LLL")
                                    : ""}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={4} className="col-user">
                    <Paper elevation={3} className="col-info">
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab={t("Friend")} key="1">
                                <Grid item xs={12} lg={12}>
                                    {renderListFriends(getMeRedux)}
                                </Grid>
                            </TabPane>
                            <TabPane tab={t("ReceiveRequest")} key="2">
                                <Grid item xs={12} lg={12}>
                                    {renderListAdd(listRequestRedux)}
                                </Grid>
                            </TabPane>
                            <TabPane tab={t("SendRequest")} key="3">
                                <Grid item xs={12} lg={12}>
                                    {renderListSend(listAddRedux)}
                                </Grid>
                            </TabPane>
                            <TabPane tab={t("User")} key="4">
                                <Grid item xs={12} lg={12}>
                                    <div className={`col2`}>
                                        <div className="col2__search-container">
                                            <TextField
                                                value={txtSearch}
                                                fullWidth
                                                placeholder="Search friend"
                                                onChange={(e) => {
                                                    setTxtSearch(
                                                        e.target.value
                                                    );
                                                    searchUser(e.target.value);
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <SearchIcon />
                                                    ),
                                                }}
                                            />
                                        </div>
                                        {isSearch
                                            ? renderListSearchUsers(listUsers)
                                            : renderListUsers(usersRedux)}
                                    </div>
                                </Grid>
                            </TabPane>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    item
                    xs={12}
                    lg={4}
                    className="col-user"
                >
                    <Paper elevation={3} className="col-change-pw">
                        <div>{t("ChangePw")}</div>
                        <div className="col-change-pw__text-input-container">
                            <TextField
                                id="outlined-basic"
                                label={t("OldPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                            <TextField
                                id="outlined-basic"
                                label={t("NewPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                            <TextField
                                id="outlined-basic"
                                label={t("ConfirmPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                        </div>
                        <div className="col-change-pw__button">Accept</div>
                    </Paper>
                    <Paper elevation={3} className="col-change-pw">
                        <div>{t("ChangePw")}</div>
                        <div className="col-change-pw__text-input-container">
                            <TextField
                                id="outlined-basic"
                                label={t("OldPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                            <TextField
                                id="outlined-basic"
                                label={t("NewPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                            <TextField
                                id="outlined-basic"
                                label={t("ConfirmPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                        </div>
                        <div className="col-change-pw__button">Accept</div>
                    </Paper>
                </Grid>
                <Grid item lg={12}>
                    <Paper>
                        <Line width={"100%"} height={"50%"} data={data} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(UserInformation));
