import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Paper,
    Grid,
    Divider,
    CircularProgress,
    TextField,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as CoursesActions from "actions/Courses";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SideBarRight from "../SideBarRight";
import {Progress} from "antd";
import * as TimerActions from "actions/Timer";
import "./styles.scss";
import callApi from "helpers/ApiCaller";
var timeVar;
const WriteCourse = (props) => {
    // Set % cho progress
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [rightAnswers, setRightAnswers] = useState([]);
    const [percent, setPercent] = useState(0);
    // Thong bao het khoa hoc
    const [endLearn, setEndLearn] = useState(false);
    // Cau tra loi cua nguoi dung
    const [wrongAnswer, setWrongAnswer] = useState("");
    // Hien thi phan giai thich sau khi tra loi sai
    const [activeExplain, setActiveExplain] = useState(false);
    // Hien thi cau tra loi hien tai
    const [activeQuestion, setActiveQuestion] = useState(0);
    // Luu cau tra loi dung
    const [result, setResult] = useState(null);
    const {t} = useTranslation("translation");
    const dispatch = useDispatch();
    const LearnCourseRedux = useSelector((state) => state.Courses.courseLearn);
    const [isWaiting, setIsWaiting] = useState(true);
    const coursesRedux = useSelector((state) => state.Courses.courses);
    useEffect(() => {
        if (coursesRedux.length === 0) {
            dispatch(CoursesActions.Get_All_Courses_Request(setIsWaiting));
        }
        if (LearnCourseRedux && LearnCourseRedux.length === 0) {
            dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
        }
    }, []);
    useEffect(() => {
        timeVar = setInterval(function () {
            console.log("Hello");
            dispatch(TimerActions.Increase_Second());
        }, 1000);
        return () => {
            clearInterval(timeVar);
        };
    }, []);

    const checkAnswer = async (answer) => {
        var convertEnglish = answer
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
        console.log(convertEnglish);
        var convertAnswerToEnglish = LearnCourseRedux[activeQuestion].answers[
            LearnCourseRedux[activeQuestion].answer_id
        ]
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
        console.log(convertAnswerToEnglish);
        if (convertAnswerToEnglish === convertEnglish) {
            setResult(answer);
            // if (rightAnswers.find((item) => item !== index)) {
            setRightAnswers((rightAnswers) => [
                ...rightAnswers,
                LearnCourseRedux[activeQuestion].question,
            ]);
            // }
            const res = await callApi(
                `content/${LearnCourseRedux[activeQuestion]._id}/triggerAnswer`,
                "PUT",
                {type: "write", answer: true}
            );
            setTimeout(function () {
                if (activeQuestion + 1 < LearnCourseRedux.length) {
                    setActiveQuestion(activeQuestion + 1);
                    setPercent(percent + 100 / LearnCourseRedux.length);
                    setResult(null);
                    setWrongAnswer("");
                } else {
                    setPercent(percent + 100 / LearnCourseRedux.length);
                    setEndLearn(true);
                }
            }, 2000);
        } else {
            // if (wrongAnswers.find((item) => item !== index)) {
            setWrongAnswers((wrongAnswers) => [
                ...wrongAnswers,
                LearnCourseRedux[activeQuestion].question,
            ]);
            // }
            setActiveExplain(true);
            const res = await callApi(
                `content/${LearnCourseRedux[activeQuestion]._id}/triggerAnswer`,
                "PUT",
                {type: "write", answer: false}
            );
        }
    };
    const renderWrongResult = () => {
        return (
            <div className="write-course-container__body__wrong-result-container">
                <div className="write-course-container__body__wrong-result-row1">
                    <SentimentVeryDissatisfiedOutlinedIcon
                        style={{marginRight: "1rem"}}
                        color="secondary"
                        fontSize="large"
                    />
                    {t("IncorrectAnswer")}
                </div>
                <Divider />
                <div className="write-course-container__body__wrong-result-row">
                    <div>{t("Define")}</div>
                    <div
                        style={{color: "#009be5"}}
                        className="write-course-container__body__wrong-result-row__define"
                    >
                        {LearnCourseRedux[activeQuestion].question}
                    </div>
                </div>
                <Divider />
                <div className="write-course-container__body__wrong-result-row">
                    <div>{t("CorrectAnswer")}</div>
                    <div
                        style={{color: "#23b26d"}}
                        className="write-course-container__body__wrong-result-row__define"
                    >
                        {
                            LearnCourseRedux[activeQuestion].answers[
                                LearnCourseRedux[activeQuestion].answer_id
                            ]
                        }
                    </div>
                </div>
                <Divider />
                <div className="write-course-container__body__wrong-result-row">
                    <div>{t("YourAnswer")}</div>
                    <div
                        style={{color: "#f50057"}}
                        className="write-course-container__body__wrong-result-row__define"
                    >
                        {wrongAnswer}
                    </div>
                </div>
                <Button
                    className="write-course-container__body__button-continue"
                    onClick={() => {
                        setActiveQuestion(activeQuestion);
                        setActiveExplain(false);
                        setWrongAnswer(null);
                        if (activeQuestion + 1 < LearnCourseRedux.length) {
                            setActiveQuestion(activeQuestion + 1);
                            setPercent(percent + 100 / LearnCourseRedux.length);
                        } else {
                            setPercent(percent + 100 / LearnCourseRedux.length);
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
        if (LearnCourseRedux && LearnCourseRedux.length !== 0) {
            return (
                <React.Fragment>
                    {endLearn ? (
                        <div className="write-course-container__end-learn">
                            <Grid container>
                                <Grid
                                    item
                                    lg={6}
                                    className="write-course-container__end-learn__right-answers"
                                >
                                    {t("CorrectPercent")}
                                    <div>
                                        <Progress
                                            type="circle"
                                            strokeColor="#87d068"
                                            percent={(
                                                (rightAnswers.length * 100) /
                                                LearnCourseRedux.length
                                            ).toFixed(2)}
                                        />
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    className="write-course-container__end-learn__wrong-answers"
                                >
                                    {t("IncorrectPercent")}
                                    <div>
                                        <Progress
                                            strokeColor="#f50057"
                                            type="circle"
                                            percent={(
                                                (wrongAnswers.length * 100) /
                                                LearnCourseRedux.length
                                            ).toFixed(2)}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                className="write-course-container__body__button-continue"
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
                        <div className="write-course-container__body">
                            {activeExplain ? (
                                renderWrongResult()
                            ) : (
                                <React.Fragment>
                                    <div style={{fontSize: "3rem"}}>
                                        {
                                            LearnCourseRedux[activeQuestion]
                                                .question
                                        }
                                        ?
                                    </div>
                                    <Grid
                                        container
                                        className="write-course-container__body__answer-container"
                                    >
                                        <Grid item xs={12} lg={8}>
                                            <TextField
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        console.log("huhu");
                                                        checkAnswer(
                                                            wrongAnswer
                                                        );
                                                    }
                                                }}
                                                value={wrongAnswer}
                                                onChange={(e) =>
                                                    setWrongAnswer(
                                                        e.target.value
                                                    )
                                                }
                                                className="write-course-container__body__answer-container__text-field"
                                                label={t("YourAnswer")}
                                                helperText={t("EnterMeaning")}
                                            />
                                        </Grid>
                                        <Grid xs={0} lg={1} />
                                        <Grid item xs={12} lg={3}>
                                            <Button
                                                disabled={wrongAnswer === ""}
                                                onClick={() =>
                                                    checkAnswer(wrongAnswer)
                                                }
                                                className={`${
                                                    result
                                                        ? "write-course-container__body__answer-container__show-result"
                                                        : "write-course-container__body__answer-container__button-answer"
                                                }`}
                                            >
                                                {result ? (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <SentimentVerySatisfiedOutlinedIcon
                                                            style={{
                                                                color:
                                                                    "#fdca47",
                                                            }}
                                                            fontSize="large"
                                                        />{" "}
                                                        {t("Correct")}{" "}
                                                    </div>
                                                ) : (
                                                    `${t("Answer")}`
                                                )}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </React.Fragment>
            );
        } else {
            return (
                <div className="write-course-container__loading">
                    <CircularProgress />
                    <div>{t("EnterWhatYouListen")}</div>
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

export default withRouter(WriteCourse);
