import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import ListFriends from "./Components/ListFriends";
import SearchFriends from "./Components/SearchFriends";
import ListRequest from "./Components/ListRequest";

import "./styles.scss";

const Friend = (props) => {
    return (
        <div className="container">
            <Grid container spacing={1}>
                <ListFriends />
                <SearchFriends />
                <ListRequest />
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Friend));
