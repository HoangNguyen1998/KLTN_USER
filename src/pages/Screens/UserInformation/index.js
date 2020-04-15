import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";

import "./styles.scss";

const UserInformation = props => {
    const {i18n, t} = useTranslation("translation");
    const user = useSelector(state => {
        return state.GetMe.user;
    });
    console.log(user);
    return (
        <div className="container">
            <Grid container spacing={6}>
                <Grid item xs={12} lg={4} className="col-avatar">
                    <Paper elevation={3} className="col-avatar__image">
                        <div />
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={8} className="col-user">
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className="col-user__item">
                        <Grid container className="col-user__item__detail">
                            <Grid item xs={4}>
                                {t("UserName")}
                            </Grid>
                            <Grid item xs={8}>
                                {user ? user.username : ""}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(UserInformation));
