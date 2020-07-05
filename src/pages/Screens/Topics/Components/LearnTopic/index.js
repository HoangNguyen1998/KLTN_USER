import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Grid, Divider, CircularProgress} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import NoteIcon from "@material-ui/icons/Note";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import * as TopicActions from "actions/Topics";
import * as CoursesActions from "actions/Courses";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SideBarRight from "../SideBarRight";
import {Progress} from "antd";
import "./styles.scss";
import * as TimerActions from "actions/Timer";
import callApi from "helpers/ApiCaller";
var timeVar;
const LearnCourse = (props) => {
    const [isWaiting, setIsWaiting] = useState(true);
    // Set % cho progress
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [rightAnswers, setRightAnswers] = useState([]);
    const [percent, setPercent] = useState(0);
    // Thong bao het khoa hoc
    const [endLearn, setEndLearn] = useState(false);
    // Luu cau hoi sai cua nguoi dung
    const [wrongAnswer, setWrongAnswer] = useState(null);
    // Hien thi phan giai thich sau khi tra loi sai
    const [activeExplain, setActiveExplain] = useState(false);
    // Hien thi cau tra loi hien tai
    const [activeQuestion, setActiveQuestion] = useState(0);
    // Luu cau tra loi dung
    const [result, setResult] = useState(null);
    const {t} = useTranslation("translation");
    const dispatch = useDispatch();
    const LearnTopicsRedux = useSelector((state) => state.Topics.topicLearn);
    const coursesRedux = useSelector((state) => state.Courses.courses);
    useEffect(() => {
        if (coursesRedux.length === 0) {
            // dispatch(TopicActions.gettopicdetailsRequest(id));
            // dispatch(TopicActions.getTopicsLearnRequest(id));
        }
        if (LearnTopicsRedux && LearnTopicsRedux.length === 0) {
            dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
            dispatch(TopicActions.gettopicdetailsRequest(props.match.params.id));
            dispatch(TopicActions.getTopicsLearnRequest(props.match.params.id));
        }
    }, []);
    // useEffect(() => {
    //     timeVar = setInterval(function () {
    //         console.log("Hello");
    //         dispatch(TimerActions.Increase_Second());
    //     }, 1000);
    //     return () => {
    //         clearInterval(timeVar);
    //     };
    // }, []);
    const renderAnswers = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <div
                        onClick={checkAnswer(index, item)}
                        className={` ${
                            result === index
                                ? "learn-course-container__body__result"
                                : "learn-course-container__body__answer"
                        }`}
                    >
                        {result === index ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                }}
                            >
                                <SentimentVerySatisfiedOutlinedIcon
                                    style={{color: "#fdca47"}}
                                    fontSize="large"
                                />{" "}
                                {t("Correct")}{" "}
                            </div>
                        ) : (
                            `${index + 1}. ${item}`
                        )}
                    </div>
                );
            });
        }
    };
    const checkAnswer = (index, answer) => async () => {
        console.log(wrongAnswers);
        console.log("---------------");
        console.log(rightAnswers);
        if (LearnTopicsRedux[activeQuestion].answer_id === index) {
            setResult(index);
            // if (rightAnswers.find((item) => item !== index)) {
            setRightAnswers((rightAnswers) => [
                ...rightAnswers,
                LearnTopicsRedux[activeQuestion].question,
            ]);
            // }
            // const res = await callApi(
            //     `content/${LearnTopicsRedux[activeQuestion]._id}/triggerAnswer`,
            //     "PUT",
            //     {type: "learn", answer: true}
            // );
            // console.log("kiem tra dap an ne: ", res.data);
            setTimeout(function () {
                if (activeQuestion + 1 < LearnTopicsRedux.length) {
                    setActiveQuestion(activeQuestion + 1);
                    setPercent(percent + 100 / LearnTopicsRedux.length);
                    setResult(null);
                } else {
                    setPercent(percent + 100 / LearnTopicsRedux.length);
                    setEndLearn(true);
                }
            }, 1000);
        } else {
            // if (wrongAnswers.find((item) => item !== index)) {
            setWrongAnswers((wrongAnswers) => [
                ...wrongAnswers,
                LearnTopicsRedux[activeQuestion].question,
            ]);
            // }
            setWrongAnswer(answer);
            setActiveExplain(true);
            // const res = await callApi(
            //     `content/${LearnTopicsRedux[activeQuestion]._id}/triggerAnswer`,
            //     "PUT",
            //     {type: "learn", answer: false}
            // );
            // console.log("kiem tra dap an ne: ", res.data);
        }
    };
    const renderWrongResult = () => {
        return (
            <div className="learn-course-container__body__wrong-result-container">
                <div className="learn-course-container__body__wrong-result-row1">
                    <SentimentVeryDissatisfiedOutlinedIcon
                        style={{marginRight: "1rem"}}
                        color="secondary"
                        fontSize="large"
                    />
                    {t("IncorrectAnswer")}
                </div>
                <Divider />
                <div className="learn-course-container__body__wrong-result-row">
                    <div>{t("Define")}</div>
                    <div
                        style={{color: "#009be5"}}
                        className="learn-course-container__body__wrong-result-row__define"
                    >
                        {LearnTopicsRedux[activeQuestion].question}
                    </div>
                </div>
                <Divider />
                <div className="learn-course-container__body__wrong-result-row">
                    <div>{t("CorrectAnswer")}</div>
                    <div
                        style={{color: "#23b26d"}}
                        className="learn-course-container__body__wrong-result-row__define"
                    >
                        {
                            LearnTopicsRedux[activeQuestion].answer[
                                LearnTopicsRedux[activeQuestion].answer_id
                            ]
                        }
                    </div>
                </div>
                <Divider />
                <div className="learn-course-container__body__wrong-result-row">
                    <div>{t("YourAnswer")}</div>
                    <div
                        style={{color: "#f50057"}}
                        className="learn-course-container__body__wrong-result-row__define"
                    >
                        {wrongAnswer}
                    </div>
                </div>
                <Button
                    className="learn-course-container__body__button-continue"
                    onClick={() => {
                        setActiveQuestion(activeQuestion);
                        setActiveExplain(false);
                        setWrongAnswer(null);
                        if (activeQuestion + 1 < LearnTopicsRedux.length) {
                            setActiveQuestion(activeQuestion + 1);
                            setPercent(percent + 100 / LearnTopicsRedux.length);
                        } else {
                            setPercent(percent + 100 / LearnTopicsRedux.length);
                            setEndLearn(true);
                        }
                    }}
                >
                    {t("Continue")}
                </Button>
            </div>
        );
    };
    const renderLearn = () => {
        if (LearnTopicsRedux && LearnTopicsRedux.length !== 0) {
            return (
                <React.Fragment>
                    {endLearn ? (
                        <div className="learn-course-container__end-learn">
                            <Grid container>
                                <Grid
                                    item
                                    lg={6}
                                    className="learn-course-container__end-learn__right-answers"
                                >
                                    {t("CorrectPercent")}
                                    <div>
                                        <Progress
                                            type="circle"
                                            strokeColor="#87d068"
                                            percent={(
                                                (rightAnswers.length * 100) /
                                                LearnTopicsRedux.length
                                            ).toFixed(2)}
                                        />
                                    </div>
                                    {/* {rightAnswers.map((item, index) => {
                                        return (
                                            <div className="learn-course-container__end-learn__right-answers__container">
                                                <div>{item}</div>
                                                <div>{item}</div>
                                            </div>
                                        );
                                    })} */}
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    className="learn-course-container__end-learn__wrong-answers"
                                >
                                    {t("IncorrectPercent")}
                                    <div>
                                        <Progress
                                            strokeColor="#f50057"
                                            type="circle"
                                            percent={(
                                                (wrongAnswers.length * 100) /
                                                LearnTopicsRedux.length
                                            ).toFixed(2)}
                                        />
                                    </div>
                                    {/* {wrongAnswers.map((item, index) => {
                                        return (
                                            <div className="learn-course-container__end-learn__wrong-answers__container">
                                                <div>{item}</div>
                                                <div>{item}</div>
                                            </div>
                                        );
                                    })} */}
                                </Grid>
                            </Grid>
                            <Button
                                className="learn-course-container__body__button-continue"
                                onClick={() => {
                                    setActiveQuestion(0);
                                    setActiveExplain(false);
                                    setWrongAnswer(null);
                                    setEndLearn(false);
                                    setPercent(0);
                                    setResult(null);
                                    setWrongAnswers([]);
                                    setRightAnswers([]);
                                }}
                            >
                                {t("RepeatLesson")}
                            </Button>
                        </div>
                    ) : (
                        <div className="learn-course-container__body">
                            {activeExplain ? (
                                renderWrongResult()
                            ) : (
                                <React.Fragment>
                                    <div style={{fontSize: "3rem"}}>
                                        {
                                            LearnTopicsRedux[activeQuestion]
                                                .question
                                        }{" "}
                                        ?
                                    </div>
                                    <div style={{display:"flex", flexDirection: "column"}} className="learn-course-container__body__answer-container">
                                        {renderAnswers(
                                            LearnTopicsRedux[activeQuestion]
                                                .answer
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </React.Fragment>
            );
        } else {
            return (
                <div className="learn-course-container__loading">
                    <CircularProgress />
                </div>
            );
        }
    };
    return (
        <div className="remember-card-container">
            <SideBarRight
                history={props.history}
                idURL={props.match.params.id}
                typeURL={props.match.path}
            />
            <div className="remember-card-content">
                <Progress
                    strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                    }}
                    percent={percent.toFixed(2)}
                />
                <Paper className="learn-course-container">
                    {renderLearn()}
                </Paper>
            </div>
        </div>
    );
};

export default withRouter(LearnCourse);
