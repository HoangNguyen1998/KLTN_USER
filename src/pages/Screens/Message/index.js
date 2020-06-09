import React, {useEffect, useState} from "react";
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

const dummyData = [
    {id: 1, message: "Hello ban B"},
    {id: 2, message: "Hello ban A nha"},
    {id: 1, message: "Cho minh lam quen"},
    {id: 1, message: "Ok ban"},
];

const Message = (props) => {
    // Noi dung tin nhan cua ban
    const [yourMessage, setYourMessage] = useState("");
    const dispatch = useDispatch();
    const {t} = useTranslation("translation");
    const socket = useSelector((state) => state.Socket.socket);
    const user = useSelector((state) => {
        return state.GetMe.user;
    });
    useEffect(() => {
        if (isEmpty(socket)) {
            console.log("Hello");
            dispatch(SocketActions.Connect_Socket());
        }
        return () => {};
    }, []);
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
                        <div className="col2__list-user-container">
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
    useEffect(() => {
        if (!isEmpty()) {
            socket.on("emitCreateMessage", (data) => {
                console.log(data);
            });
        }
    });
    const sendMessage = (id) => {
        console.log("hiihi");
        if (!isEmpty(socket)) {
            socket.emit(
                "onCreateMessage",
                {message: yourMessage, receiver: "5e5c87a41ed0fa0017369fab"},
                () => {
                    console.log("Gui tin nhan thanh cong");
                }
            );
        }
    };
    const renderMessage = (data) => {
        console.log("render tin nhan nao")
        if (data) {
            return data.map((item, index) => {
                if (index % 2 === 0) {
                    return (
                        <div className="message-col2__content__left-side">
                            Ben trai
                        </div>
                    );
                } else {
                    return (
                        <div className="message-col2__content__right-side">
                            Ben phai
                        </div>
                    );
                }
            });
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
                <Grid item xs={12} lg={6}>
                    <Paper elevation={3} className="message-col2">
                        <div className="message-col2__content">
                            {renderMessage(dummyData)}
                        </div>
                        <div>
                            <Divider className="message-col2__divider" />
                            <TextField
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
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
                                            onClick={() => sendMessage()}
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
                    lg={3}
                    className="col-user"
                >
                    <Paper elevation={3} className="col-change-pw">
                        {renderListFriend(user)}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Message));
