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
import {Modal, Radio, Checkbox} from "antd";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import * as listApi from "helpers/ListApi";
import * as CoursesActions from "actions/Courses";
import {
    RadioButtonUncheckedOutlined,
    RadioButtonCheckedOutlined,
} from "@material-ui/icons";

const CheckboxGroup = Checkbox.Group;

const TopicDetail = (props) => {
    const topicDetailRedux = useSelector((state) => state.Topics.topicDetail);
    const [selectArr, setSelectArr] = useState([]);
    const [isWaiting, setIsWaiting] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showModalSelect, setShowModalSelect] = useState(false);
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
    useEffect(() => {
        console.log(selectArr);
    }, [selectArr]);
    const _addToCourse = (item) => {
        setTextAdd(item);
        setShowModal(!showModal);
    };
    const _selectWord = (item) => {
        if (selectArr.includes(item)) {
            const copyArr = [...selectArr];
            copyArr.splice(selectArr.indexOf(item), 1);
            setSelectArr(copyArr);
        } else {
            setSelectArr([...selectArr, item]);
        }
    };
    const _selectAll = (data) => {
        console.log(data);
        if (selectArr.length === data.length) {
            setSelectArr([]);
        } else {
            console.log(data);
            setSelectArr(data);
        }
    };
    const _confirmAddToCourse = async () => {
        console.log(valueRadio);
        var arrayAddToCourse = [];
        for (let i = 0; i < selectArr.length; i++) {
            arrayAddToCourse.push({
                text: selectArr[i].text,
                mean: selectArr[i].vocabulary_meaning,
            });
        }
        const res = await listApi._puttData(
            `courses/${valueRadio}/addContent`,
            arrayAddToCourse
        );
        console.log(res);
        if (res.code === 200) {
            dispatch(CoursesActions.Get_All_Courses_Request(setIsWaiting));
            setTextAdd("");
            setValueRadio("");
            setSelectArr([])
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
                                <IconButton onClick={() => _selectWord(item)}>
                                    {selectArr.includes(item) ? (
                                        <RadioButtonCheckedOutlined
                                            style={{fontSize: 25}}
                                        />
                                    ) : (
                                        <RadioButtonUncheckedOutlined
                                            style={{fontSize: 25}}
                                        />
                                    )}
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
            <Button
                style={{marginRight: "1rem"}}
                className="button-test"
                onClick={() => _test()}
            >
                Kiểm tra
            </Button>
            <Button
                style={{marginRight: "1rem"}}
                className="button-test"
                onClick={() => _selectAll(topicDetailRedux)}
            >
                {selectArr.length === topicDetailRedux.length &&
                selectArr.length !== 0 ? (
                    <RadioButtonCheckedOutlined style={{fontSize: 25}} />
                ) : (
                    <RadioButtonUncheckedOutlined style={{fontSize: 25}} />
                )}
                Chọn tất cả
            </Button>
            <Button
                className="button-test"
                onClick={() => setShowModal(!showModal)}
            >
                Tuỳ chọn
            </Button>
            <Grid container>{renderTopic(topicDetailRedux)}</Grid>
            <Modal
                onOk={() => _confirmAddToCourse()}
                onCancel={() => setShowModal(!showModal)}
                title="Chọn khoá học mà bạn muốn thêm vào"
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
