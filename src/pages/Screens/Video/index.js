import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import Loading from "pages/Components/Loading";
import * as VideoActions from "actions/Video";

import "./styles.scss";
import {Grid} from "@material-ui/core";
const markdown = require("markdown").markdown;
const Video = (props) => {
    // STATE
    const [isWaiting, setIsWaiting] = useState(true);
    const [valueTab, setValueTab] = useState(1);
    // DEFINE
    const {id} = props.match.params;
    // REDUX
    const dispatch = useDispatch();
    const alphabetRedux = useSelector((state) => state.Alphabet.alphabet);
    const videoRedux = useSelector((state) => state.Video.video);
    // USEEFFECT
    useEffect(() => {
        dispatch(VideoActions.Get_All_Video_Request(setIsWaiting));
        // dispatch(
        //     VideoActions.Get_Alphabet_Detail_Request(
        //         id ? id : "5ea01bed347b3d4180a78540"
        //     )
        // );
    }, [dispatch]);
    // FUNC
    const getVideoDetail=(id)=>{
        props.history.push(`/video/${id}`)
    }
    const renderVideo = (data) => {
        let xhtml = null;
        if (data) {
            return data.map((item, index) => {
                return (
                    <Grid item xs={12} lg={4}>
                        <div style={{display: "flex", flexDirection: "column"}} onClick={()=>getVideoDetail(item._id)}>
                            <div>{item.name}</div>
                            {/* <iframe
                                title="Hello"
                                src={item.embeb}
                                width="400"
                                height="300"
                                allowFullScreen
                            ></iframe> */}
                            <img height="250px" src={item.thumbnailLink} alt="Khong tai duoc anh" />
                        </div>
                    </Grid>
                );
            });
        }
    };
    // RENDER
    if (isWaiting) return <Loading />;
    return (
        <div className="container">
            <Grid spacing={3} container>
                {renderVideo(videoRedux)}
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(Video));
