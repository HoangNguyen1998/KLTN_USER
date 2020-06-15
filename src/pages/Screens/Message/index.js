import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {
    CircularProgress,
    TextField,
    Grid,
    Paper,
    IconButton,
    Divider,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {isEmpty} from "lodash";

import * as SocketActions from "actions/Socket";
import "./styles.scss";
import callApi from "helpers/ApiCaller";
import moment from "moment";

const dummyData = [
    {id: 1, message: "Hello ban B"},
    {id: 2, message: "Hello ban A nha"},
    {id: 1, message: "Cho minh lam quen"},
    {id: 1, message: "Ok ban"},
];

const Message = (props) => {
    const dispatch = useDispatch();
    const {history} = props;
    const {id} = props.match.params;
    const {t} = useTranslation("translation");
    const socket = useSelector((state) => state.Socket.socket);
    const user = useSelector((state) => {
        return state.GetMe.user;
    });
    console.log(id);
    // REF
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        console.log("scroll toi bottom")
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    // STATE
    //noi dung tin nhan cua ban
    const [yourMessage, setYourMessage] = useState("");
    const [friendInfo, setFriendInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    // USEEFFECT
    useEffect(scrollToBottom, [messages]);
    useEffect(() => {
        if (!id) {
            if (user) {
                if (user.friends.length !== 0) {
                    history.push(`messages/${user.friends[0].userId}`);
                }
            }
        }
    }, []);
    useEffect(() => {
        getInfoFriend();
    }, [user]);
    // useEffect(() => {
    //     if (isEmpty(socket)) {
    //         dispatch(SocketActions.Connect_Socket());
    //     }
    // });
    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.on("emitCreateMessage", (data) => {
                console.log("Nhan tin nhan cua nguoi gui: ", data);
                const {receiver, sender, message} = data._doc;
                setMessages([
                    ...messages,
                    {receiver: receiver, sender: sender, message: message},
                ]);
            });
            return () => socket.removeEventListener("emitCreateMessage");
        }
    });

    // FUNC
    const renderFriendInfo = () => {
        if (friendInfo !== null) {
            return (
                <Paper elevation={3} className="col-avatar">
                    <div className="col-avatar__image">
                        <img src="https://picsum.photos/200" alt="Hihi" />
                    </div>
                    <div className="col-avatar__info">
                        <div>{t("UserName")}</div>
                        <div className="col-avatar__info__detail">
                            {friendInfo ? friendInfo.username : ""}
                        </div>
                    </div>
                    <div className="col-avatar__info">
                        <div>{t("Email")}</div>
                        <div className="col-avatar__info__detail">
                            {friendInfo ? friendInfo.email : ""}
                        </div>
                    </div>
                    <div className="col-avatar__info">
                        <div>{t("Friend")}</div>
                        <div className="col-avatar__info__detail">
                            {friendInfo ? friendInfo.friends.length : ""}
                        </div>
                    </div>
                    <div className="col-avatar__info">
                        <div>{t("Courses")}</div>
                        <div className="col-avatar__info__detail">
                            {friendInfo ? friendInfo.courses.length : ""}
                        </div>
                    </div>
                    <div className="col-avatar__info">
                        <div>{t("CreatedAt")}</div>
                        <div className="col-avatar__info__detail">
                            {friendInfo
                                ? moment(friendInfo.createdAt).format("LLL")
                                : ""}
                        </div>
                    </div>
                </Paper>
            );
        } else {
            return (
                <Paper
                    elevation={3}
                    style={{padding: "1rem", textAlign: "center"}}
                >
                    <CircularProgress />
                </Paper>
            );
        }
    };
    const getInfoFriend = async () => {
        console.log("lay thong tin nguoi dung", user);
        if (user) {
            console.log("lay thong tin nguoi dung");
            if (user.friends.length !== 0) {
                console.log("lay thong tin nguoi dung");
                const res = await callApi(`users/${id}`, "GET", null);
                const resMess = await callApi(
                    `messageChat/ofFriend?friend=${id}`,
                    "GET"
                );
                console.log("Thong tin nguoi ban: ", res.data);
                console.log("Tin nhan giua hai ng: ", resMess.data);
                setFriendInfo(res.data.result);
                setMessages(resMess.data.result);
            }
        }
        scrollToBottom()
    };
    const onChangeFriendChat = (userID) => async () => {
        setMessages([]);
        setFriendInfo(null);
        history.push(`/messages/${userID}`);
        const res = await callApi(`users/${userID}`, "GET", null);
        const resMess = await callApi(
            `messageChat/ofFriend?friend=${userID}`,
            "GET"
        );
        console.log("Thong tin nguoi ban: ", res.data);
        console.log("Tin nhan giua hai ng: ", resMess.data);
        setFriendInfo(res.data.result);
        setMessages(resMess.data.result);
    };
    const renderListFriend = (data) => {
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
                        <div
                            onClick={onChangeFriendChat(item.userId)}
                            className="col2__list-user-container"
                        >
                            <div className="col2__list-user-container__item-container">
                                <div className="col1__item-container__info">
                                    <div className="col1__item-container__info__image"></div>
                                    <div>{item ? item.username : ""}</div>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        }
    };
    const sendMessage = (id) => {
        console.log(`${id}`);
        if (!isEmpty(socket)) {
            if (yourMessage !== "") {
                socket.emit(
                    "onCreateMessage",
                    {
                        message: yourMessage,
                        receiver: `${id}`,
                    },
                    () => {
                        setMessages([
                            ...messages,
                            {
                                receiver: friendInfo ? friendInfo.userId : "",
                                sender: user ? user._id : "",
                                message: yourMessage,
                            },
                        ]);
                        setYourMessage("");
                    }
                );
            }
        }
    };
    const renderMessage = () => {
        if (messages) {
            return messages.map((item, index) => {
                if (item.sender === id) {
                    return (
                        <div className="message-col2__content__left-side">
                            <div className="message-col2__left-side-style">
                                {item.message}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="message-col2__content__right-side">
                            <div className="message-col2__right-side-style">
                                {item.message}
                            </div>
                        </div>
                    );
                }
            });
        } else {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }
    };
    return (
        <div className="container">
            <Grid container spacing={3} style={{height: "100%"}}>
                <Grid
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    item
                    xs={12}
                    lg={3}
                >
                    <Paper elevation={3} className="message-col1">
                        {renderListFriend(user)}
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Paper elevation={3} className="message-col2">
                        <div
                            className="message-col2__content"
                        >
                            {renderMessage()}
                            <div ref={messagesEndRef} />
                        </div>
                        <div>
                            <Divider className="message-col2__divider" />
                            <TextField
                                required
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage(id);
                                    }
                                }}
                                className="message-col2__text-field"
                                value={yourMessage}
                                onChange={(e) => {
                                    setYourMessage(e.target.value);
                                }}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => sendMessage(id)}
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </div>
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
                    {renderFriendInfo()}
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Message));
