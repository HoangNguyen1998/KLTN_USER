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
import EditAvatar from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Line} from "react-chartjs-2";
import moment from "moment";
import Popover from "@material-ui/core/Popover";
import {withFormik} from "formik";
import * as Yup from "yup";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {isEmpty} from "lodash";
import IconButton from "@material-ui/core/IconButton";
import CallApi from "helpers/ApiCaller";
import {Get_Me_Request} from "actions/GetMe";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as NotifiActions from "actions/Notification";
import "./styles.scss";
import * as listApi from "helpers/ListApi";
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
    const {
        history,
        values,
        errors,
        touched,
        handleChange,
        enqueueSnackbar,
        setFieldValue,
        setFieldTouched,
    } = props;
    const {password, retypepassword} = values;
    const socket = useSelector((state) => state.Socket.socket);
    const dispatch = useDispatch();
    const [listNotFriend, setListNotFriend] = useState([]);
    // set state luu gia tri cho popover
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [typePopover, setTypePopover] = useState("");

    const [txtSearch, setTxtSearch] = useState("");
    const [listUsers, setListUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [oldPw, setOldPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const listAddRedux = useSelector((state) => state.Friends.listAdd);
    const listRequestRedux = useSelector((state) => state.Friends.listRequest);

    // open popover

    const _submitChangePw = async () => {
        console.log(errors);
        if (isEmpty(errors)) {
            console.log(oldPw);
            console.log(password);
            console.log(retypepassword);
            const form = {
                newPass: password,
                oldPass: oldPw,
            };
            try {
                const res = await listApi._puttData(
                    `users/${user._id}/changePass`,
                    form
                );
                console.log(res);
                if (res.code === 500) {
                    enqueueSnackbar(res.message, {variant: "error"});
                }
                if (res.code === 200) {
                    enqueueSnackbar("Thay doi mat khau thanh cong", {
                        variant: "success",
                    });
                    setOldPw("");
                    setFieldValue("password", "");
                    setFieldValue("retypepassword", "");
                    setFieldTouched("password", false);
                    setFieldTouched("retypepassword", false);
                }
            } catch (err) {
                enqueueSnackbar(err.response.message, {variant: "error"});
            }
        }
    };

    const _handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const _handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClick = (event, username, id, type) => {
        console.log(username, id);
        setAnchorEl(event.currentTarget);
        setUserName(username);
        setUserId(id);
        setTypePopover(type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setUserName(null);
        setUserId(null);
        setTypePopover("");
    };
    const [oldImage, setOldImage] = useState("");
    const [imageCustom, setImageCustom] = useState("");
    const [linkGoc, setLinkGoc] = useState("");
    const _changeImage = (e) => {
        if (e.target.files[0]) {
            const selectFile = URL.createObjectURL(e.target.files[0]);
            setLinkGoc(e.target.files[0]);
            setOldImage(imageCustom);
            console.log(selectFile);
            setImageCustom(selectFile);
        }
    };
    const _huyTaiAnh = () => {
        setImageCustom(oldImage);
    };
    const _uploadFileImage = async () => {
        const formData = new FormData();
        console.log(imageCustom);
        formData.append("file", linkGoc);
        console.log(formData.getAll("file"));
        const res = await listApi._postFormData("users/image", formData);
        console.log(res);
        if (res.code === 200) {
            dispatch(Get_Me_Request());
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const renderPopover = () => {
        // render ban be
        if (typePopover === "friends") {
            return (
                <List>
                    <ListItem button>{t("Detail")}</ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            onMessages(userId);
                        }}
                    >
                        {t("Chat")}
                    </ListItem>
                </List>
            );
        }
        // render danh sach nguoi dung theo dang search
        if (typePopover === "listusersearch") {
            return (
                <List>
                    <ListItem button>{t("Detail")}</ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            removeInSearchUser(userId);
                            addFriend(userName, userId);
                            handleClose();
                        }}
                    >
                        {t("Add")}
                    </ListItem>
                </List>
            );
        }
        // render danh sach nguoi dung
        if (typePopover === "listuser") {
            return (
                <List>
                    <ListItem button>{t("Detail")}</ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            addFriend(userName, userId);
                            handleClose();
                        }}
                    >
                        {t("Add")}
                    </ListItem>
                </List>
            );
        }
        // render danh sach loi moi ket ban da gui
        if (typePopover === "sendaddfriend") {
            return (
                <List>
                    <ListItem button>{t("Detail")}</ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            rejectFriend(userId);
                            handleClose();
                        }}
                    >
                        {t("Reject")}
                    </ListItem>
                </List>
            );
        }
        // render danh sach loi moi ket ban
        if (typePopover === "addfriend") {
            return (
                <List>
                    <ListItem button>{t("Detail")}</ListItem>
                    <ListItem button>{t("Reject")}</ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            acceptFriend(userName, userId);
                            handleClose();
                        }}
                    >
                        {t("Accept")}
                    </ListItem>
                </List>
            );
        }
    };

    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
        if (getMeRedux) {
            console.log("lay hinh anh nao");
            if (getMeRedux.avatar) {
                setImageCustom(getMeRedux.avatar);
                setOldImage(getMeRedux.avatar);
            } else {
                setOldImage("https://picsum.photos/200");
                setImageCustom("https://picsum.photos/200");
            }
        }
    }, [getMeRedux]);
    useEffect(() => {
        // if (isEmpty(socket)) {
        //     console.log("Hello");
        //     dispatch(SocketActions.Connect_Socket());
        // }
        return () => {
            // console.log("Helooooooo")
            // if(socket){
            //     socket.removeAllListeners();
            // }
        };
    }, []);
    console.log(user);

    // ----- LIST FRIENDS -----
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

    const onMessages = (id) => {
        history.push(`messages/${id}`);
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
                                    <div className="col1__item-container__info__image">
                                        <img
                                            style={{
                                                width: "5rem",
                                                height: "5rem",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                item && item.userId.avatar
                                                    ? item.userId.avatar
                                                    : `https://picsum.photos/200`
                                            }
                                            alt="huhu"
                                        />
                                    </div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        handleClick(
                                            e,
                                            item.username,
                                            item.userId,
                                            "friends"
                                        );
                                    }}
                                    className="col2__list-user-container__item-container__action-container"
                                >
                                    <MoreVertIcon style={{fontSize: 30}} />
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    // ----- HET LIST FRIENDS -----

    // ----- LOI MOI KET BAN -----
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
    const acceptFriend = (username, id) => {
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
                                    <div className="col1__item-container__info__image">
                                        <img
                                            style={{
                                                width: "5rem",
                                                height: "5rem",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                item && item.userId.avatar
                                                    ? item.userId.avatar
                                                    : `https://picsum.photos/200`
                                            }
                                            alt="huhu"
                                        />
                                    </div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        handleClick(
                                            e,
                                            item.username,
                                            item._id,
                                            "addfriend"
                                        );
                                    }}
                                    className="col2__list-user-container__item-container__action-container"
                                >
                                    <MoreVertIcon style={{fontSize: 30}} />
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    // ----- HET LOI MOI KET BAN -----

    // ----- LOI MOI KET BAN DA GUI -----
    useEffect(() => {
        if (!isEmpty(socket)) {
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
    const rejectFriend = (id) => {
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
                                    <div className="col1__item-container__info__image">
                                    <img
                                            style={{
                                                width: "5rem",
                                                height: "5rem",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                item && item.userId.avatar
                                                    ? item.userId.avatar
                                                    : `https://picsum.photos/200`
                                            }
                                            alt="huhu"
                                        />
                                    </div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        handleClick(
                                            e,
                                            item.username,
                                            item._id,
                                            "sendaddfriend"
                                        );
                                    }}
                                    className="col2__list-user-container__item-container__action-container"
                                >
                                    <MoreVertIcon style={{fontSize: 30}} />
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    // ----- HET LOI MOI KET BAN DA GUI -----

    // ----- NGUOI DUNG KHONG PHAI BAN BE -----
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

    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
    }, []);

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
                                    <div className="col1__item-container__info__image">
                                    <img
                                            style={{
                                                width: "5rem",
                                                height: "5rem",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                item && item.userId.avatar
                                                    ? item.userId.avatar
                                                    : `https://picsum.photos/200`
                                            }
                                            alt="huhu"
                                        />
                                    </div>
                                    <div>
                                        {item
                                            ? item.username
                                            : "https://picsum.photos/200"}
                                    </div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        handleClick(
                                            e,
                                            item.username,
                                            item._id,
                                            "listusersearch"
                                        );
                                    }}
                                    className="col2__list-user-container__item-container__action-container"
                                >
                                    <MoreVertIcon style={{fontSize: 30}} />
                                    {/* <div className="col2__list-user-container__item-container__action-container__action">
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
                                    </div> */}
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
                                    <div className="col1__item-container__info__image">
                                    <img
                                            style={{
                                                width: "5rem",
                                                height: "5rem",
                                                borderRadius: "50%",
                                            }}
                                            src={
                                                item && item.userId.avatar
                                                    ? item.userId.avatar
                                                    : `https://picsum.photos/200`
                                            }
                                            alt="huhu"
                                        />
                                        {/* <iframe src="https://drive.google.com/file/d/12vuuaFbvsO8aXTAjsishhDi0rLztygG0/preview" style={{width: "5rem", height: "5rem", borderRadius: "50%"}}></iframe> */}
                                    </div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                                <div
                                    onClick={(e) => {
                                        handleClick(
                                            e,
                                            item.username,
                                            item._id,
                                            "listuser"
                                        );
                                    }}
                                    className="col2__list-user-container__item-container__action-container"
                                >
                                    <MoreVertIcon style={{fontSize: 30}} />
                                    {/* <div className="col2__list-user-container__item-container__action-container__action">
                                        Detail
                                    </div>
                                    <div
                                        onClick={() =>
                                            addFriend(item.username, item._id)
                                        }
                                        className="col2__list-user-container__item-container__action-container__action"
                                    >
                                        Add
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    // ----- HET NGUOI DUNG KHONG PHAI BAN BE -----
    return (
        <div className="container">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <Paper elevation={3} className="col-avatar">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className="col-avatar__image"
                        >
                            <input
                                style={{display: "none"}}
                                multiple
                                id="raised-button-file"
                                type="file"
                                onChange={(e) => _changeImage(e)}
                            />
                            <img
                                style={{width: "20rem", height: "20rem"}}
                                src={imageCustom}
                                alt="Hihi"
                            />
                            {imageCustom !== oldImage ? (
                                <div>
                                    <Button onClick={() => _huyTaiAnh()}>
                                        Huy Bo
                                    </Button>
                                    <Button onClick={() => _uploadFileImage()}>
                                        Luu
                                    </Button>
                                </div>
                            ) : (
                                <Button>
                                    <label htmlFor="raised-button-file">
                                        Chinh sua anh dai dien
                                    </label>
                                </Button>
                            )}
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
                                value={oldPw}
                                onChange={(e) => setOldPw(e.target.value)}
                                id="outlined-basic"
                                label={t("OldPw")}
                                variant="outlined"
                                className="col-change-pw__text-input-container__text-input"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t("Password")}
                                value={password}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                error={
                                    errors.password && touched.password
                                        ? true
                                        : false
                                }
                                helperText={
                                    touched.password
                                        ? `${t(errors.password)}`
                                        : ""
                                }
                                autoComplete="current-password"
                                onChange={handleChange}
                                onKeyUp={() =>
                                    setFieldTouched("password", true, false)
                                }
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={_handleClickShowPassword}
                                            onMouseDown={
                                                _handleMouseDownPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="retypepassword"
                                label={t("RetypePassword")}
                                type={showPassword ? "text" : "password"}
                                value={retypepassword}
                                id="retypepassword"
                                error={
                                    errors.retypepassword &&
                                    touched.retypepassword
                                        ? true
                                        : false
                                }
                                helperText={
                                    touched.retypepassword
                                        ? `${t(errors.retypepassword)}`
                                        : ""
                                }
                                autoComplete="current-password"
                                onChange={handleChange}
                                onKeyUp={() =>
                                    setFieldTouched(
                                        "retypepassword",
                                        true,
                                        false
                                    )
                                }
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={_handleClickShowPassword}
                                            onMouseDown={
                                                _handleMouseDownPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </div>
                        <div
                            onClick={() => _submitChangePw()}
                            className="col-change-pw__button"
                        >
                            {t("Accept")}
                        </div>
                    </Paper>
                    {/* <Paper elevation={3} className="col-change-pw">
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
                        <div className="col-change-pw__button">
                            {t("Accept")}
                        </div>
                    </Paper> */}
                </Grid>
            </Grid>
            <Popover
                // id={id}
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className="pop-over">{renderPopover()}</div>
            </Popover>
        </div>
    );
};

const UserFormik = withFormik({
    mapPropsToValues: () => ({
        password: "",
        retypepassword: "",
    }),
    validationSchema: Yup.object().shape({
        password: Yup.string()
            .min(8, "MinPassword")
            .required("PasswordRequired"),
        retypepassword: Yup.string()
            .required("ConfirmPassword")
            .oneOf([Yup.ref("password")], "MatchPassword"),
    }),
})(UserInformation);
export default withRouter(withSnackbar(UserFormik));
