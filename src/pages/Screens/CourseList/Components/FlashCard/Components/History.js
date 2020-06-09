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
import {HelpOutline, VolumeUp} from "@material-ui/icons";
import callApi from "helpers/ApiCaller";
const {TabPane} = Tabs;

var date = new Date();
const WrongWord = [
    {
        word: "Hello",
        mean: "xin chao",
    },
    {
        word: "Work",
        mean: "lam viec",
    },
    {
        word: "Work",
        mean: "lam viec",
    },
    {
        word: "Work",
        mean: "lam viec",
    },
    {
        word: "Work",
        mean: "lam viec",
    },
];

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
    const renderWrongWord = (data) => {
        if (data) {
            return data.map((item, index) => {
                return (
                    <Paper
                        elevation={3}
                        className="history-container__word-container__word"
                    >
                        {indexWrong === index ? (
                            <div>
                                <TextField
                                    value={editWrongWord}
                                    onChange={(e) =>
                                        setEditWrongWord(e.target.value)
                                    }
                                />
                            </div>
                        ) : (
                            <div>{item.word}</div>
                        )}
                        {indexWrong === index ? (
                            <div>
                                <TextField
                                    value={editWrongMean}
                                    onChange={(e) =>
                                        setEditWrongMean(e.target.value)
                                    }
                                />
                            </div>
                        ) : (
                            <div>{item.mean}</div>
                        )}
                        <div>
                            <Tooltip title={t("Speak")}>
                                <IconButton onClick={onSpeak(item.word)}>
                                    <VolumeUpIcon />
                                </IconButton>
                            </Tooltip>
                            {indexWrong !== index ? (
                                <Tooltip title={t("Edit1Word")}>
                                    <IconButton
                                        onClick={() => {
                                            setIndexWrong(index);
                                            setEditWrongWord(item.word);
                                            setEditWrongMean(item.mean);
                                        }}
                                    >
                                        <EditOutlined />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title={t("Edit1Word")}>
                                    <IconButton
                                        onClick={() => {
                                            setIndexWrong(null);
                                            setEditWrongWord(null);
                                            setEditWrongMean(null);
                                        }}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </Paper>
                );
            });
        }
    };
    return (
        <div className="history-container">
            <div className="history-container__word-container">
                <div className="history-container__word-container--wrong-header">
                    {t("WordsNotMaster")}
                </div>
                <div className="history-container__word-container__list-word">
                    {renderWrongWord(WrongWord)}
                </div>
            </div>
            <div className="history-container__word-container">
                <div className="history-container__word-container--correct-header">
                    {t("WordsMaster")}
                </div>
                <div className="history-container__word-container__list-word">
                    {renderWrongWord(WrongWord)}
                </div>
            </div>
            <Button
                onClick={async () => {
                    const minute = timerReducer
                        ? timerReducer.hours * 60 + timerReducer.minutes - timerReducer.old
                        : "";
                    const res = await callApi("/timeOnline", "POST", {minute, date});
                    console.log("res tra ve", res)
                }}
            >
                Hello
            </Button>
        </div>
    );
};

export default withRouter(History);
