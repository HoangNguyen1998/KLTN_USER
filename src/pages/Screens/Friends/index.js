import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import ListAdd from "./Components/ListAdd";
import SearchFriends from "./Components/SearchFriends";
import socketIOClient from "socket.io-client";
import * as SocketActions from "actions/Socket";
import ListRequest from "./Components/ListRequest";
import getToken from "helpers/GetToken";
import "./styles.scss";

console.log("dfdgldfgdsfkgjdfg;ldfg: ", getToken());
// let socket = socketIOClient.connect("https://d277e752.ngrok.io/", {
//     query: "token=" + getToken(),
// });
// let socket = null;

const Friend = (props) => {
    const socket = useSelector((state) => state.Socket.socket);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SocketActions.Connect_Socket());
        return ()=>{
            // console.log("Helooooooo")
            // if(socket){
            //     socket.removeAllListeners();
            // }
            
        }
    },[]);
    // useEffect(() => {
    //     socket = socketIOClient.connect("https://d277e752.ngrok.io/", {
    //         query: "token=" + getToken(),
    //     });
    //     setReRender(true);
    // }, []);
    // console.log("renderrrrrrrr")
    return (
        <div className="container">
            <Grid container spacing={1}>
                <SearchFriends/>
                <ListAdd  />
                <ListRequest />
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Friend));
