import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {CardMedia} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import _ from "lodash";
import {Link} from "react-router-dom";
import SpeakIcon from "@material-ui/icons/VolumeUp";
import {withRouter} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Box from "@material-ui/core/Box";
import RightIcon from "@material-ui/icons/CheckCircle";
import socketIOClient from "socket.io-client";
import WrongIcon from "@material-ui/icons/Cancel";
import * as ChallengesActions from "actions/Challenges";
import getToken from "helpers/GetToken";
// let socket = socketIOClient.connect("https://jp-server-kltn.herokuapp.com/", {
//     query: "token=" + getToken(),
// });
// socket.on("authenticate", (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
// });
// socket.on("validation", (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
// });
// const test= (dispatch)=>socket.on("newComment", (comment) => {
//      dispatch(ChallengesActions.Get_Comments([comment]))
// })
// var socket;
// let socket = socketIOClient.connect("https://jp-server-kltn.herokuapp.com/", {
//     query: "token=" + getToken(),
// });
// socket.on("authenticate", (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
// });
// socket.on("validation", (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
// });

const ChallengeDetail = (props) => {
    console.log("renderrrrrrrrrrrrr");
    const [valueComment, setValueComment] = useState(null);
    const {
        ChallengeDetail,
        Challenges,
        position,
        setPosition,
        showResult,
        setIsWaiting,
        socket,
        setShowResult,
        // valueComment,
        // setValueComment,
    } = props;
    const {id}= props.match.params
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Hello")
        dispatch(ChallengesActions.Get_All_Challenges_Request(setIsWaiting));
        dispatch(
            ChallengesActions.Get_Challenge_Details_Request(
                id ? id : "5dea0eeb1433d60e205f6a4b"
            )
        );
    }, [id]);
    useEffect(() => {
        socket.on("authenticate", (data) => {
            console.log(data);
            alert(JSON.stringify(data));
        });
        socket.on("validation", (data) => {
            console.log(data);
            alert(JSON.stringify(data));
        });
        socket.on("newComment", (comment) => {
            console.log("Helllooooo");
            dispatch(ChallengesActions.Get_Comments([comment]));
        });
        return () => socket.removeEventListener("newComment");
    }, []);
    const {
        _id,
        question,
        image,
        answer,
        choice_1,
        choice_2,
        explanation,
        choice_1_voice,
        choice_2_voice,
    } = ChallengeDetail;
    const [showExplan, setShowExplan] = useState(false);
    const {t} = useTranslation("translation");
    const listComment = useSelector((state) => state.listComment);

    // socket
    useEffect(() => {
        socket.emit("join", {room: _id}, () => {
            console.log("connect done!" + `${_id} fake`);
        });
    }, []);
    const comment = () => {
        console.log("k;dfgfdgjdklgjdfklgkl");
        setValueComment("");
        socket.emit(
            "createComment",
            {comment: valueComment, room: _id},
            (data) => {
                console.log("send! ", data);
            }
        );
    };

    //func
    const checkAnswer = (choice) => {
        if (choice === 1) {
            setPosition(1);
        }
        if (choice === 2) {
            setPosition(2);
        }
        if (choice === answer) {
            setShowResult(1);
        } else setShowResult(2);
    };
    const onShowExplan = () => {
        setShowExplan(false);
    };
    const playMp3 = (choice) => () => {
        let audio = null;
        if (choice === 1) {
            audio = new Audio(`${choice_1_voice}`);
            audio.play();
        } else {
            audio = new Audio(`${choice_2_voice}`);
            audio.play();
        }
    };
    const findIndex = (ChallengeDetail, Challenges) => {
        let result = null;
        const {_id} = ChallengeDetail;
        result = _.findIndex(Challenges, {_id});
        return result;
    };
    const renderShowResult = () => {
        let xhtml = null;
        if (showResult === 1) {
            xhtml = (
                <React.Fragment>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="xem giải thích chi tiết">
                            <IconButton onClick={() => setShowExplan(true)}>
                                <RightIcon style={{color: "green"}} />
                                <ArrowDownIcon style={{color: "green"}} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </React.Fragment>
            );
        }
        if (showResult === 2) {
            xhtml = (
                <React.Fragment>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <WrongIcon style={{color: "red"}} />
                    </Box>
                </React.Fragment>
            );
        }
        return xhtml;
    };
    return (
        <div className="col1">
            <Paper
                elevation={3}
                style={{minHeight: "20vh", padding: "5px", textAlign: "center"}}
            >
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <div className="font-custom16">
                        {`${t("Question")} ${
                            findIndex(ChallengeDetail, Challenges) + 1
                        }`}
                    </div>
                    <div className="font-custom16">
                        <Rating value={1} readOnly max={3} />
                    </div>
                </Box>
                <Divider className="col1__divider" />
                <CardMedia className="col1__card-media" image={image} />
                <Typography style={{margin: "2% 0"}}>
                    {question ? question.replace(/&quot;/g, '"') : ""}
                </Typography>
                <Box className="col1__answer-container">
                    <Button
                        onClick={() => checkAnswer(1)}
                        className={`col1__answer-container__button ${
                            showResult === 1 && position === 1
                                ? "animated flash"
                                : ""
                        } ${
                            showResult === 2 && position === 1
                                ? "animated shake"
                                : ""
                        }`}
                    >
                        {choice_1}
                    </Button>
                    {/* {this.state.position === 1 ? this.renderShowResult() : ""} */}
                    {position === 1 ? renderShowResult() : ""}
                    <Tooltip title={t("Conversation")}>
                        <IconButton onClick={playMp3(1)}>
                            <SpeakIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1%",
                    }}
                >
                    <Button
                        onClick={() => checkAnswer(2)}
                        className={`col1__answer-container__button ${
                            showResult === 1 && position === 2
                                ? "animated flash"
                                : ""
                        } ${
                            showResult === 2 && position === 2
                                ? "animated shake"
                                : ""
                        }`}
                    >
                        {choice_2}
                    </Button>
                    {position === 2 ? renderShowResult() : ""}
                    {/* {this.state.position === 2 ? this.renderShowResult() : ""} */}
                    <Tooltip title={t("Conversation")}>
                        <IconButton onClick={playMp3(2)}>
                            <SpeakIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>
            <div className="col1__comment-container">
                {t("YourComment")}
                <TextField
                    value={valueComment}
                    onChange={(e) => setValueComment(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={5}
                />
                <Button
                    className="col1__comment-container__button-post"
                    onClick={comment}
                >
                    {t("Post")}
                </Button>
            </div>
            <Dialog
                open={showExplan}
                onClose={onShowExplan}
                aria-labelledby="form-dialog-title"
            >
                <CardMedia component="img" src={image} />
                <DialogContent>
                    <DialogContentText>
                        {explanation ? explanation.replace(/&quot;/g, '"') : ""}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowExplan(false)}
                        color="primary"
                    >
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withRouter(ChallengeDetail);
