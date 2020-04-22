import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import ListAdd from "./Components/ListAdd";
import SearchFriends from "./Components/SearchFriends";
import socketIOClient from "socket.io-client";
import ListRequest from "./Components/ListRequest";
import getToken from "helpers/GetToken";
import "./styles.scss";

let socket = socketIOClient.connect("https://jp-server-kltn.herokuapp.com/", {
    query: "token=" + getToken(),
});

const Friend = (props) => {
    return (
        <div className="container">
            <Grid container spacing={1}>
                <SearchFriends socket={socket} />
                <ListAdd />
                <ListRequest />
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Friend));
