import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import * as VideoActions from "actions/Video";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";

const VideoDetail = (props) => {
    const videoDetailRedux = useSelector((state) => state.Video.videoDetail);
    const {id} = props.match.params;
    const dispatch = useDispatch();
    console.log(videoDetailRedux);
    console.log(props.match.params.id);
    useEffect(() => {
        dispatch(VideoActions.Get_Video_Detail_Request(id));
    }, []);
    const renderVideo = (data) => {
        console.log(data);
    };
    return (
        <div className="container">
            {videoDetailRedux ? (
                <iframe width="100%" height="700px" allowFullScreen src={videoDetailRedux.embeb} />
            ) : (
                ""
            )}
        </div>
    );
};

export default withRouter(withSnackbar(VideoDetail));
