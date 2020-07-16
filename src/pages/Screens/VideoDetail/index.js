import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import * as VideoActions from "actions/Video";
import {CircularProgress, Grid, Paper, Divider} from "@material-ui/core";

import "./styles.scss";
import LearnVideo from "./Components/LearnVideo";

const VideoDetail = (props) => {
    const videoDetailRedux = useSelector((state) => state.Video.videoDetail);
    const videoRedux = useSelector((state) => state.Video.video);
    const {id} = props.match.params;
    const dispatch = useDispatch();
    console.log(videoDetailRedux);
    console.log(props.match.params.id);
    useEffect(() => {
        if (videoRedux && videoRedux.length === 0) {
            dispatch(VideoActions.Get_All_Video_Request());
        }
        dispatch(VideoActions.Get_Video_Detail_Request(id));
    }, [id]);
    const getVideoDetail = (id) => {
        props.history.push(`/video/${id}`);
    };
    const renderListVideo = (data) => {
        console.log("clgv: ", data);
        if (data) {
            return data.map((item, index) => {
                console.log("cc");
                return (
                    <Paper
                        className="right-side-container__detail"
                        onClick={() => getVideoDetail(item._id)}
                    >
                        {/* <iframe
                                title="Hello"
                                src={item.embeb}
                                width="400"
                                height="300"
                                allowFullScreen
                            ></iframe> */}
                        <img
                            height="250px"
                            src={`https://learn-jp-kltn.herokuapp.com/api/assets/videos/${item.thumbnailLink}`}
                            alt="Khong tai duoc anh"
                        />
                        <Divider style={{marginTop: "0.5rem"}}></Divider>
                        <div style={{textAlign: "center"}}>{item.name}</div>
                    </Paper>
                );
            });
        }
    };
    return (
        <div className="container">
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Paper
                        className="video-left-side-container"
                        style={{padding: "1rem"}}
                    >
                        {videoDetailRedux ? (
                            <iframe
                                className="play-video"
                                title="Hello"
                                width="100%"
                                allowFullScreen
                                src={videoDetailRedux.embeb}
                            />
                        ) : (
                            ""
                        )}
                    </Paper>
                    <Paper style={{marginTop: "1rem", padding: "1rem"}}>
                        <div className="practice-container">
                            <div>Cau hoi on tap tu video</div>
                            <div>
                                <LearnVideo />
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={4} className="right-side-container">
                    {renderListVideo(videoRedux)}
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(VideoDetail));
