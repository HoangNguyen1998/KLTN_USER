import React, {useEffect, useState} from "react";
import "../styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Grid, Paper} from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import Speech from "speak-tts";
import {withSnackbar} from "notistack";
import {Button, IconButton, Divider} from "@material-ui/core";
import * as TopicActions from "actions/Topics";
import AddIcon from "@material-ui/icons/Add";
import {withRouter} from "react-router-dom";
import {Modal, Radio} from "antd";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as listApi from "helpers/ListApi";
import * as CoursesActions from "actions/Courses";

const TopicDetail = (props) => {
    const topicDetailRedux = useSelector((state) => state.Topics.topicDetail);
    const [isWaiting, setIsWaiting] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [textAdd, setTextAdd] = useState("");
    const [valueRadio, setValueRadio] = useState("");
    const {history, enqueueSnackbar} = props;
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const Courses = useSelector((state) => {
        return state.Courses;
    });
    const {courses} = Courses;
    console.log(props.match.params.id);
    useEffect(() => {
        dispatch(TopicActions.gettopicdetailsRequest(id));
        dispatch(TopicActions.getTopicsLearnRequest(id));
        if (courses.length === 0) {
            dispatch(CoursesActions.Get_All_Courses_Request(setIsWaiting));
        }
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
    const _addToCourse = (item) => {
        setTextAdd(item);
        setShowModal(!showModal);
    };
    const _confirmAddToCourse = async () => {
        console.log(valueRadio);
        const res = await listApi._puttData(
            `courses/${valueRadio}/addContent`,
            [{text: textAdd.text, mean: textAdd.vocabulary_meaning}]
        );
        console.log(res);
        if (res.code === 200) {
            setTextAdd("");
            setValueRadio("");
            setShowModal(!showModal);
            enqueueSnackbar("Them tu vung vao khoa hoc thanh cong", {
                variant: "success",
            });
        }
    };
    const _test = () => {
        history.push(`/topics/${id}/learn`);
    };
    const pauseSpeak = () => {
        speech.cancel();
    };
    useEffect(() => {
        return () => speech.cancel();
    }, []);
    const _renderCourses = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <Radio value={item._id} style={{marginBottom: "2rem"}}>
                        {item.title}
                    </Radio>
                );
            });
        }
    };
    const renderTopic = (data) => {
        console.log(data);
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        className="flex-row"
                        style={{justifyContent: "center", padding: "1rem"}}
                    >
                        <Paper className="item-detail-container">
                            <div>{item.text}</div>
                            <Divider style={{margin: "1rem 0rem"}} />
                            <div>{item.vocabulary_meaning}</div>
                            <Divider style={{margin: "1rem 0rem"}} />
                            <div>
                                <IconButton onClick={() => onSpeak(item.text)}>
                                    <VolumeDownIcon style={{fontSize: 25}} />
                                </IconButton>
                                <IconButton onClick={() => _addToCourse(item)}>
                                    <AddIcon style={{fontSize: 25}} />
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>
                );
            });
        }
    };
    return (
        <div className="container">
            <Button className="button-test" onClick={() => _test()}>
                Kiem tra
            </Button>
            <Grid container>{renderTopic(topicDetailRedux)}</Grid>
            <Modal
                onOk={() => _confirmAddToCourse()}
                onCancel={() => setShowModal(!showModal)}
                title="Chon khoa hoc ban muon them vao"
                visible={showModal}
            >
                <Radio.Group
                    value={valueRadio}
                    onChange={(e) => setValueRadio(e.target.value)}
                >
                    {_renderCourses(courses)}
                </Radio.Group>
            </Modal>
        </div>
    );
};

export default withRouter(withSnackbar(TopicDetail));
