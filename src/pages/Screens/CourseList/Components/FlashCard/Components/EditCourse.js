import React, {useState, useEffect} from "react";
import "../styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {Button, Grid, Paper, IconButton, Tooltip} from "@material-ui/core";
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
const {TabPane} = Tabs;

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
    const {history} = props;
    const [activeWord, setActiveWord] = useState(0);
    const dispatch = useDispatch();
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
                        <div>{item.word}</div>
                        <div>{item.mean}</div>
                        <div>
                            <Tooltip title={t("Speak")}>
                                <IconButton onClick={onSpeak(item.word)}>
                                    <VolumeUpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Edit1Word")}>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Paper>
                );
            });
        }
    };
    return (
        <div className="history-container">
            <div className="history-container__word-container">
                <div className="history-container__word-container__list-word">
                    {renderWrongWord(WrongWord)}
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <Button style={{padding: "1rem", backgroundColor: "#009be5"}}>
                    Them hoac xoa thuat ngu
                </Button>
            </div>
        </div>
    );
};

export default withRouter(History);
