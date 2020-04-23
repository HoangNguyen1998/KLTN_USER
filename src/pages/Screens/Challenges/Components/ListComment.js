import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {useTranslation} from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import Modal from "@material-ui/core/Modal";
import CallApi from "helpers/ApiCaller";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ReportIcon from "@material-ui/icons/Report";
import * as ChallengesActions from "actions/Challenges";
import findIndex from "lodash/findIndex";
import _ from "lodash";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const ListComment = (props) => {
    const {ChallengeDetail} = props;
    const {_id} = ChallengeDetail;
    const {t} = useTranslation("translation");
    const dispatch = useDispatch();
    const commentRedux = useSelector((state) => state.Challenges.listComment);
    const userRedux = useSelector((state) => {
        if (state.GetMe.user) {
            return state.GetMe.user._id;
        }
    });
    const [openReport, setOpenReport] = useState(false);
    const [valueReport, setValueReport] = useState("");
    const [indexUpdateCmt, setIndexUpdateCmt] = useState("");
    const [openUpdateCmt, setOpenUpdateCmt] = useState(false);
    const [valueUpdateCmt, setValueUpdateCmt] = useState("");
    const [idReport, setIdReport] = useState(null);
    const socket = useSelector((state) => state.Socket.socket);

    useEffect(() => {
        if (socket) {
            socket.emit("join", {room: _id}, () => {
                console.log("connect done!" + `${_id} fake`);
            });
        }
    }, [_id]);
    useEffect(() => {
        if (socket) {
            socket.on("authenticate", (data) => {
                console.log(data);
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                console.log(data);
                alert(JSON.stringify(data));
            });
            socket.on("newComment", (comment) => {
                dispatch(ChallengesActions.Get_Comments([comment]));
            });
            return () => socket.removeEventListener("newComment");
        }
    }, []);
    //func
    const onOpenModalReport = (id) => {
        setOpenReport(true);
        setIdReport(id);
    };
    const onReportUser = async () => {
        const res = await CallApi("reportUser", "POST", {
            commentId: idReport,
            content: valueReport,
        });
        alert("report thanh cong: ", res);
        setOpenReport(false);
    };
    const onOpenModalUpdateCmt = (id) => () => {
        setOpenUpdateCmt(true);
        console.log(id);
        console.log(commentRedux);
        const test = commentRedux.findIndex((item) => item._id === id);
        console.log(commentRedux[test]);
        setIndexUpdateCmt(test);
        setValueUpdateCmt(commentRedux[test].content);
    };

    const onUpdateCmt = () => {
        if (socket) {
            console.log(commentRedux);
            const {_id, idChallenge} = commentRedux[indexUpdateCmt];
            socket.emit(
                "updateComment",
                {
                    _id: _id,
                    room: idChallenge,
                    commentUp: valueUpdateCmt,
                },
                (data) => {
                    console.log("send: ", data);
                    setIndexUpdateCmt("");
                    setOpenUpdateCmt(false);
                }
            );
        }
    };
    const renderComment = (commentRedux) => {
        if (commentRedux.length !== 0) {
            return commentRedux.map((item, index) => {
                return (
                    <div className="list-comment-container__list-item">
                        <div className="list-comment-container__list-item__user-name">
                            {item.userName}
                        </div>
                        <TextField
                            className="list-comment-container__list-item__text"
                            key={index}
                            value={item.content}
                            inputProps={{readOnly: true}}
                            helperText={moment(item.createdAt).format("LLL")}
                            multiline
                            InputProps={{
                                endAdornment: userRedux ? (
                                    userRedux === item.idUser ? (
                                        <Tooltip title="chinh sua">
                                            <IconButton
                                                onClick={onOpenModalUpdateCmt(
                                                    item._id
                                                )}
                                            >
                                                <EditRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="bao cao vi pham">
                                            <IconButton
                                                onClick={() =>
                                                    onOpenModalReport(item._id)
                                                }
                                            >
                                                <ReportIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                ) : (
                                    ""
                                ),
                            }}
                        />
                    </div>
                );
            });
        }
    };
    return (
        <div className="list-comment-container">
            <div className=" font-custom18 list-comment-container__header">
                {t("ListComment")}
            </div>
            {renderComment(commentRedux)}

            {/* modal bao cao vi pham */}
            <Dialog
                className="list-comment-container__modal-report"
                open={openReport}
                keepMounted
                onClose={() => setOpenReport(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Bao cao vi pham
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <TextField
                            style={{width: "50rem"}}
                            id="outlined-multiline-static"
                            value={valueReport}
                            onChange={(e) => setValueReport(e.target.value)}
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            variant="outlined"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenReport(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onReportUser} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* modal chinh sua comment */}
            <Dialog
                className="list-comment-container__modal-report"
                open={openUpdateCmt}
                keepMounted
                onClose={() => setOpenUpdateCmt(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Chinh sua comment
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <TextField
                            style={{width: "50rem"}}
                            id="outlined-multiline-static"
                            value={valueUpdateCmt}
                            onChange={(e) => setValueUpdateCmt(e.target.value)}
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            variant="outlined"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenUpdateCmt(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onUpdateCmt} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <iframe
                src="https://drive.google.com/file/d/1UJYsP6cUGpd11Rztbg4qLprB5eOCYgKk/preview"
                width={640}
                height={480}
            /> */}
        </div>
    );
};

export default ListComment;
