import React, {useEffect, useState} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Speech from "speak-tts";
import {withSnackbar} from "notistack";
import IconButton from "@material-ui/core/IconButton";
import * as TopicActions from "actions/Topics";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const TopicDetail = (props) => {
    const topicDetailRedux = useSelector((state) => state.Topics.topicDetail);
    const {id} = props.match.params;
    const dispatch = useDispatch();
    console.log(props.match.params.id);
    useEffect(() => {
        dispatch(TopicActions.gettopicdetailsRequest(id));
    }, []);
    const speech = new Speech();
    const onSpeak = (word) => {
        console.log(word);
        if (word.charCodeAt() > parseInt(0x3040)) speech.setLanguage("ja-JP");
        else speech.setLanguage("en-US");
        speech.setRate(0.7);
        speech.setPitch(1);
        speech.speak({
            text: `${word}`,
        });
    };
    const pauseSpeak = () => {
        speech.cancel();
    };
    useEffect(() => {
        return () => speech.cancel();
    }, []);
    const renderTopic = (data) => {
        console.log(data);
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <Grid item xs={12} lg={6}>
                        <div className="item-detail-container">
                            <div>{item.text}</div>
                            <div>{item.vocabulary_meaning}</div>
                            <IconButton onClick={() => onSpeak(item.text)}>
                                <VolumeDownIcon style={{fontSize: 25}} />
                            </IconButton>
                        </div>
                    </Grid>
                );
            });
        }
    };
    return (
        <div className="container">
            <Grid spacing={5} container>
                {renderTopic(topicDetailRedux)}
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(TopicDetail));
