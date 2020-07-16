import React, {useState, useEffect} from "react";
import "../styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
    Button,
    Grid,
    Paper,
    IconButton,
    Tooltip,
    TextField,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import * as CoursesActions from "actions/Courses";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SideBarRight from "pages/Screens/CourseList/Components/SideBarRight";
import {Divider} from "@material-ui/core";
import {Tabs} from "antd";
import Speech from "speak-tts";
import {EditOutlined, BarChartOutlined} from "@ant-design/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import {HelpOutline, VolumeUp} from "@material-ui/icons";
import callApi from "helpers/ApiCaller";
const {TabPane} = Tabs;

var date = new Date();

const History = (props) => {
    const [indexWrong, setIndexWrong] = useState(null);
    const [editWrongWord, setEditWrongWord] = useState(null);
    const [editWrongMean, setEditWrongMean] = useState(null);
    const [indexCorrect, setIndexCorrect] = useState(null);
    const [editCorrectWord, setEditCorrectWord] = useState(null);
    const [editCorrectMean, setEditCorrectMean] = useState(null);
    const {history} = props;
    const [activeWord, setActiveWord] = useState(0);
    const dispatch = useDispatch();
    const timerReducer = useSelector((state) => state.Timer);
    const {t} = useTranslation("translation");
    const speech = new Speech();
    const onSpeak = (word) => () => {
        if (word.charCodeAt() > parseInt(0x3040)) speech.setLanguage("ja-JP");
        else speech.setLanguage("en-US");
        speech.setRate(0.7);
        speech.setPitch(1);
        speech.speak({
            text: `${word}`,
        });
    };
    const [isRotate, setIsRotate] = useState(false);
    const courseRedux = useSelector((state) => state.Courses.course);
    const {contents} = courseRedux;
    // api update details content
    const updateContent = (id, type) => async () => {
        console.log("vao ham update: ", id, "------", type);
        if (type === "wrong") {
            const data = {
                id: id,
                text: editWrongWord,
                mean: editWrongMean,
            };
            // const res = await callApi(`content/${id}`, "PUT", {
            //     text: editWrongWord,
            //     mean: editWrongMean,
            // });
            dispatch(CoursesActions.Update_Detail_One_Request(data));
            setIndexWrong(null);
            setEditWrongWord(null);
            setEditWrongMean(null);
        }
        if (type === "correct") {
            const data = {
                id: id,
                text: editCorrectWord,
                mean: editCorrectMean,
            };
            dispatch(CoursesActions.Update_Detail_One_Request(data));
            setIndexCorrect(null);
            setEditCorrectWord(null);
            setEditCorrectMean(null);
        }
    };
    const renderWrongWord = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                if (!item.masterContent) {
                    return (
                        <Paper
                            elevation={3}
                            className="history-container__word-container__word"
                        >
                            {indexWrong === index ? (
                                <div className="history-container__word-container__text">
                                    <TextField
                                        value={editWrongWord}
                                        onChange={(e) =>
                                            setEditWrongWord(e.target.value)
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="history-container__word-container__text">
                                    {item.text}
                                </div>
                            )}
                            {indexWrong === index ? (
                                <div className="history-container__word-container__mean">
                                    <TextField
                                        value={editWrongMean}
                                        onChange={(e) =>
                                            setEditWrongMean(e.target.value)
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="history-container__word-container__mean">
                                    {item.mean}
                                </div>
                            )}
                            <div>
                                {item.totalTrueLearn}/{item.totalClickLearn}
                            </div>
                            <div className="history-container__word-container__item-action">
                                <Tooltip title={t("Speak")}>
                                    <IconButton onClick={onSpeak(item.text)}>
                                        <VolumeUpIcon />
                                    </IconButton>
                                </Tooltip>
                                {indexWrong !== index ? (
                                    <Tooltip title={t("Edit1Word")}>
                                        <IconButton
                                            onClick={() => {
                                                setIndexWrong(index);
                                                setEditWrongWord(item.text);
                                                setEditWrongMean(item.mean);
                                            }}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={t("Edit1Word")}>
                                        <IconButton
                                            onClick={updateContent(
                                                item._id,
                                                "wrong"
                                            )}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        </Paper>
                    );
                }
            });
        } else {
            return (
                <div style={{textAlign: "center", padding: "1rem"}}>
                    <CircularProgress />
                </div>
            );
        }
    };
    const renderCorrectWord = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                if (item.masterContent) {
                    return (
                        <Paper
                            elevation={3}
                            className="history-container__word-container__word"
                        >
                            {indexCorrect === index ? (
                                <div className="history-container__word-container__text">
                                    <TextField
                                        value={editCorrectWord}
                                        onChange={(e) =>
                                            setEditCorrectWord(e.target.value)
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="history-container__word-container__text">
                                    {item.text}
                                </div>
                            )}
                            {indexCorrect === index ? (
                                <div className="history-container__word-container__mean">
                                    <TextField
                                        value={editCorrectMean}
                                        onChange={(e) =>
                                            setEditCorrectMean(e.target.value)
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="history-container__word-container__mean">
                                    {item.mean}
                                </div>
                            )}
                            <div>
                                {item.totalTrueLearn}/{item.totalClickLearn}
                            </div>

                            <div className="history-container__word-container__item-action">
                                <Tooltip title={t("Speak")}>
                                    <IconButton onClick={onSpeak(item.text)}>
                                        <VolumeUpIcon />
                                    </IconButton>
                                </Tooltip>
                                {indexCorrect !== index ? (
                                    <Tooltip title={t("Edit1Word")}>
                                        <IconButton
                                            onClick={() => {
                                                setIndexCorrect(index);
                                                setEditCorrectWord(item.text);
                                                setEditCorrectMean(item.mean);
                                            }}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={t("Edit1Word")}>
                                        <IconButton
                                            onClick={updateContent(
                                                item._id,
                                                "correct"
                                            )}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        </Paper>
                    );
                }
            });
        } else {
            return (
                <div style={{textAlign: "center", padding: "1rem"}}>
                    <CircularProgress />
                </div>
            );
        }
    };
    return (
        <div className="history-container">
            <div className="history-container__word-container">
                <div className="history-container__word-container--wrong-header">
                    {t("WordsNotMaster")}
                </div>
                <div className="history-container__word-container__list-word">
                    {renderWrongWord(contents)}
                </div>
            </div>
            <div className="history-container__word-container">
                <div className="history-container__word-container--correct-header">
                    {t("WordsMaster")}
                </div>
                <div className="history-container__word-container__list-word">
                    {renderCorrectWord(contents)}
                </div>
            </div>
        </div>
    );
};

export default withRouter(History);
