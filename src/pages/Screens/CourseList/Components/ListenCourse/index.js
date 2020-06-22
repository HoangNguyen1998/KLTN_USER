import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Paper,
    Grid,
    Divider,
    CircularProgress,
    IconButton,
    TextField,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as CoursesActions from "actions/Courses";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SideBarRight from "../SideBarRight";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Speech from "speak-tts";
import {Progress} from "antd";
import "./styles.scss";
import * as TimerActions from "actions/Timer";
import callApi from "helpers/ApiCaller";
var timeVar;
const EnglishKeyboard = [
    {
        line: 1,
        content: [
            "`",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "-",
            "=",
        ],
    },
    {
        line: 2,
        content: [
            "",
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "[",
            "]",
            "``",
        ],
    },
    {
        line: 3,
        content: [
            "",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            ";",
            "'",
            "",
        ],
    },
    {
        line: 4,
        content: [
            "",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            ",",
            ".",
            "/",
            "",
            "",
            "",
        ],
    },
    {
        line: 5,
        content: [""],
    },
];

const Hiragana = [
    {
        line: 1,
        content: [
            "ろ",
            "ぬ",
            "ふ",
            "あ",
            "う",
            "え",
            "お",
            "や",
            "ゆ",
            "よ",
            "わ",
            "ほ",
            "へ",
            "Backspace",
        ],
    },
    {
        line: 2,
        content: [
            "Tab",
            "た",
            "て",
            "い",
            "す",
            "か",
            "ん",
            "な",
            "に",
            "ら",
            "せ",
            "゛",
            "゜",
            "む",
        ],
    },

    {
        line: 3,
        content: [
            "Caps lock",
            "ち",
            "と",
            "し",
            "は",
            "き",
            "く",
            "ま",
            "の",
            "り",
            "れ",
            "け",
            "Enter",
        ],
    },

    {
        line: 4,
        content: [
            "Shift",
            "つ",
            "さ",
            "そ",
            "ひ",
            "こ",
            "み",
            "も",
            "ね",
            "る",
            "め",
            "Shift",
        ],
    },
    {
        line: 5,
        content: ["Space"],
    },
];

const Katakana = [
    {
        line: 1,
        content: [
            "ロ",
            "ヌ",
            "フ",
            "ア",
            "ウ",
            "エ",
            "オ",
            "ヤ",
            "ユ",
            "ヨ",
            "ワ",
            "ホ",
            "ヘ",
            "Backspace",
        ],
    },
    {
        line: 2,
        content: [
            "Tab",
            "タ",
            "テ",
            "イ",
            "ス",
            "カ",
            "ン",
            "ナ",
            "ニ",
            "ラ",
            "セ",
            "゛",
            "゜",
            "ム",
        ],
    },

    {
        line: 3,
        content: [
            "Caps lock",
            "チ",
            "ト",
            "シ",
            "ハ",
            "キ",
            "ク",
            "マ",
            "ノ",
            "リ",
            "レ",
            "ケ",
            "Enter",
        ],
    },

    {
        line: 4,
        content: [
            "Shift",
            "ツ",
            "サ",
            "ソ",
            "ヒ",
            "コ",
            "ミ",
            "モ",
            "ネ",
            "ル",
            "メ",
            "Shift",
        ],
    },
    {
        line: 5,
        content: ["Space"],
    },
];
const ListenCourse = (props) => {
    const [changeKeyboard, setChangeKeyboard] = useState(false);
    const [valueInput, setValueInput] = useState([]);
    const _listenVirtualKeyboard = (value) => {
        if (value === "Backspace") {
            const custom = [...valueInput];
            custom.splice(custom.length - 1, 1);
            setValueInput(custom);
        } else {
            if (value === "Space") {
                setValueInput((state) => [...state, " "]);
            } else {
                setValueInput((state) => [...state, value]);
            }
        }
        console.log(valueInput.join(""));
    };
    const renderHiraKeyboard = () => {
        return Hiragana.map((line, parent) => {
            return (
                <div className={`line-container-${parent}`}>
                    {line.content.map((item, child) => {
                        return (
                            <div
                                onClick={() => _listenVirtualKeyboard(item)}
                                className={`line-container-${parent}__item-normal`}
                            >
                                <div>
                                    {EnglishKeyboard[parent].content[child]}
                                </div>
                                <div
                                    className={`line-container-${parent}__item-normal__middle`}
                                >
                                    {item}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };
    const renderKataKeyboard = () => {
        return Katakana.map((line, parent) => {
            return (
                <div className={`line-container-${parent}`}>
                    {line.content.map((item, child) => {
                        return (
                            <div
                                onClick={() => _listenVirtualKeyboard(item)}
                                className={`line-container-${parent}__item-normal`}
                            >
                                <div>
                                    {EnglishKeyboard[parent].content[child]}
                                </div>
                                <div
                                    className={`line-container-${parent}__item-normal__middle`}
                                >
                                    {item}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };
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
    const speech = new Speech();
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
        if (LearnCourseRedux.length !== 0) {
            onSpeak(LearnCourseRedux[activeQuestion].question);
        }
    }, [LearnCourseRedux, activeQuestion]);
    const onSpeak = (word) => {
        if (word.charCodeAt() > parseInt(0x3040)) speech.setLanguage("ja-JP");
        else speech.setLanguage("en-US");
        speech.setRate(0.7);
        speech.setPitch(1);
        speech.speak({
            text: `${word}`,
        });
    };
    // useEffect(() => {
    //     timeVar = setInterval(function () {
    //         console.log("Hello");
    //         dispatch(TimerActions.Increase_Second());
    //     }, 1000);
    //     return () => {
    //         clearInterval(timeVar);
    //     };
    // }, []);
    const checkAnswer = async (answer) => {
        if (
            LearnCourseRedux[activeQuestion].question.toLowerCase() ===
            answer.toLowerCase()
        ) {
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
                {type: "listen", answer: true}
            );
            setTimeout(function () {
                if (activeQuestion + 1 < LearnCourseRedux.length) {
                    setActiveQuestion(activeQuestion + 1);
                    setPercent(percent + 100 / LearnCourseRedux.length);
                    setResult(null);
                    setValueInput([]);
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
                {type: "listen", answer: false}
            );
        }
    };
    const renderWrongResult = () => {
        return (
            <div className="listen-course-container__body__wrong-result-container">
                <div className="listen-course-container__body__wrong-result-row1">
                    <SentimentVeryDissatisfiedOutlinedIcon
                        style={{marginRight: "1rem"}}
                        color="secondary"
                        fontSize="large"
                    />
                    {t("IncorrectAnswer")}
                </div>
                <Divider />
                <div className="listen-course-container__body__wrong-result-row">
                    <div>{t("Define")}</div>
                    <div
                        style={{color: "#009be5"}}
                        className="listen-course-container__body__wrong-result-row__define"
                    >
                        {LearnCourseRedux[activeQuestion].question}
                    </div>
                </div>
                <Divider />
                <div className="listen-course-container__body__wrong-result-row">
                    <div>{t("CorrectAnswer")}</div>
                    <div
                        style={{color: "#23b26d"}}
                        className="listen-course-container__body__wrong-result-row__define"
                    >
                        {LearnCourseRedux[activeQuestion].question}
                    </div>
                </div>
                <Divider />
                <div className="listen-course-container__body__wrong-result-row">
                    <div>{t("YourAnswer")}</div>
                    <div
                        style={{color: "#f50057"}}
                        className="listen-course-container__body__wrong-result-row__define"
                    >
                        {valueInput.join("")}
                    </div>
                </div>
                <Button
                    className="listen-course-container__body__button-continue"
                    onClick={() => {
                        setActiveQuestion(activeQuestion);
                        setActiveExplain(false);
                        setValueInput([]);
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
                        <div className="listen-course-container__end-learn">
                            <Grid container>
                                <Grid
                                    item
                                    lg={6}
                                    className="listen-course-container__end-learn__right-answers"
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
                                    className="listen-course-container__end-learn__wrong-answers"
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
                                className="listen-course-container__body__button-continue"
                                onClick={() => {
                                    setActiveQuestion(0);
                                    setActiveExplain(false);
                                    setValueInput([]);
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
                        <div className="listen-course-container__body">
                            {activeExplain ? (
                                renderWrongResult()
                            ) : (
                                <React.Fragment>
                                    <div>
                                        <IconButton
                                            onClick={() =>
                                                onSpeak(
                                                    LearnCourseRedux[
                                                        activeQuestion
                                                    ].question
                                                )
                                            }
                                        >
                                            <VolumeUpIcon
                                                style={{fontSize: 30}}
                                            />
                                        </IconButton>
                                    </div>
                                    <Grid
                                        container
                                        className="listen-course-container__body__answer-container"
                                    >
                                        <Grid item xs={12} lg={8}>
                                            <TextField
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        console.log("huhu");
                                                        checkAnswer(
                                                            valueInput.join("")
                                                        );
                                                    }
                                                }}
                                                value={valueInput.join("")}
                                                // onChange={(e) =>
                                                //     setWrongAnswer(
                                                //         e.target.value
                                                //     )
                                                // }
                                                className="listen-course-container__body__answer-container__text-field"
                                                label={t("YourAnswer")}
                                                helperText={t(
                                                    "EnterWhatYouListen"
                                                )}
                                            />
                                        </Grid>
                                        <Grid xs={0} lg={1} />
                                        <Grid item xs={12} lg={3}>
                                            <Button
                                                disabled={
                                                    valueInput.length === 0
                                                }
                                                onClick={() =>
                                                    checkAnswer(
                                                        valueInput.join("")
                                                    )
                                                }
                                                className={`${
                                                    result
                                                        ? "listen-course-container__body__answer-container__show-result"
                                                        : "listen-course-container__body__answer-container__button-answer"
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
                                        <Grid>
                                            {changeKeyboard
                                                ? renderKataKeyboard()
                                                : renderHiraKeyboard()}
                                            <Button
                                                onClick={() =>
                                                    setChangeKeyboard(
                                                        !changeKeyboard
                                                    )
                                                }
                                            >
                                                {changeKeyboard
                                                    ? "Katakana"
                                                    : "Hiragana"}
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
                <div className="listen-course-container__loading">
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

export default withRouter(ListenCourse);
