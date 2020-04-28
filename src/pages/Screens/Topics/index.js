import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import {Tooltip} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import * as TopicsActions from "actions/Topics";
import TopicDetail from './Components/TopicDetail'

import "./styles.scss";

const Topics = (props) => {
    const [isWaiting, setIsWaiting] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const {i18n, t} = useTranslation("translation");
    const dispatch = useDispatch();
    const TopicsRedux = useSelector((state) => state.Topics);
    const {topics} = TopicsRedux;
    useEffect(() => {
        if (topics.length === 0) {
            dispatch(TopicsActions.getTopicsRequest(setIsWaiting));
        }
        if (topics.length !== 0) {
            setIsWaiting(false);
        }
    }, [topics.length, dispatch]);
    //func
    const onGetTopicDetail = (id) => () => {
        props.history.push(`/topics/${id}`)
        // console.log("lay du lieu");
        // setOpenModal(true)
        // dispatch(TopicsActions.gettopicdetailsRequest(id));
    };
    const renderTopic = (data) => {
        if (data) {
            return data.map((item, index) => {
                return (
                    <Grid item xs lg={3}>
                        <div
                            className="item-container"
                            onClick={onGetTopicDetail(item._id)}
                        >
                            <div>bai hoc so: {item.number}</div>
                            <div>{item.title}</div>
                        </div>
                    </Grid>
                );
            });
        }
    };
    //render
    return (
        <div className="container">
            <Grid
                className="container__topic-item-container"
                container
                spacing={3}
            >
                {renderTopic(topics)}
            </Grid>
            <Dialog
                onClose={()=>setOpenModal(false)}
                fullScreen
                open={openModal}
            >
                <div className="modal-create-course">
                    <Tooltip className="modal-create-course__icon-close">
                        <IconButton onClick={()=>setOpenModal(false)}>
                            <CloseIcon style={{fontSize: 25}} />
                        </IconButton>
                    </Tooltip>
                    <TopicDetail
                        // onHideCreateCourse={onHideCreateCourse}
                        // history={history}
                        // enqueueSnackbar={enqueueSnackbar}
                        // t={t}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default withRouter(withSnackbar(Topics));
