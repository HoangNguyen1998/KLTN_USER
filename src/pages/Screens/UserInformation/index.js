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
import ListSend from "./Components/ListSend";
import ListReceive from "./Components/ListReceive";
import ListFriends from "./Components/ListFriends";
import {isEmpty} from "lodash";

import "./styles.scss";
import moment from "moment";

const {TabPane} = Tabs;

const UserInformation = (props) => {
    const {i18n, t} = useTranslation("translation");
    const user = useSelector((state) => {
        return state.GetMe.user;
    });
    const socket = useSelector((state) => state.Socket.socket);
    const dispatch = useDispatch();
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
                                <ListFriends />
                            </TabPane>
                            <TabPane tab={t("ReceiveRequest")} key="2">
                                <ListReceive />
                            </TabPane>
                            <TabPane tab={t("SendRequest")} key="3">
                                <ListSend />
                            </TabPane>
                            <TabPane tab={t("User")} key="4">
                                <SearchFriends />
                            </TabPane>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid
                    style={{display: "flex", flexDirection: "column", justifyContent:"space-between"}}
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
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(UserInformation));
