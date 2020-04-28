import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {CardMedia, Grid} from "@material-ui/core";
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
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import WrongIcon from "@material-ui/icons/Cancel";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as ChallengesActions from "actions/Challenges";
import getToken from "helpers/GetToken";
const AlphabetDetail = (props) => {
    const [valueComment, setValueComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const {valueTab, onSpeak, isLoading} = props;
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const alphabetDetail = useSelector(
        (state) => state.Alphabet.alphabetDetail
    );
    // USEEFFECT
    useEffect(() => {}, []);
    // FUNC

    const renderSpeak = (item) => {
        if (parseInt(valueTab) === 1) {
            return item.hira;
        }
        if (parseInt(valueTab) === 2) {
            return item.kata;
        }
    };
    const renderWord = (item) => {
        var i = 0;
        var arr = [];
        let word = null;
        let test = null;
        let svg = null;
        if (item) {
            if (parseInt(valueTab) === 1) {
                word = item.hira;
            }
            if (parseInt(valueTab) === 2) {
                word = item.kata;
            }
            if (word) {
                test = word.split("");
            }
            if (test) {
                if (test.length === 1) {
                    svg = ("00000" + word.charCodeAt(0).toString(16)).slice(-5);
                    return `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`;
                }
            }
            if (test.length > 1) {
                for (i = 0; i < test.length; i++) {
                    console.log("???????: ", test[i]);
                    svg = ("00000" + test[i].charCodeAt(0).toString(16)).slice(
                        -5
                    );
                    arr = [
                        ...arr,
                        `http://learn-jp-kltn.herokuapp.com/api/assets/svgAlphabet/${svg}.svg`,
                    ];
                }
                console.log(arr);
                return arr;
            }
        }
        return null;
    };
    const renderDetail = (data) => {
        if (isLoading) {
            return (
                <div className="alphabet-detail-container__card-detail">
                    <CircularProgress />
                </div>
            );
        }
        if (data) {
            console.log(data)
            return (
                <div className="alphabet-detail-container__card-detail">
                    <IconButton onClick={() => onSpeak(renderSpeak(data))}>
                        <VolumeDownIcon style={{fontSize: 25}} />
                    </IconButton>
                    <div>
                        {renderWord(data).length === 2 ? (
                            <div>
                                <img
                                    alt="error"
                                    src={renderWord(data)[0]}
                                    style={{width: "15rem"}}
                                />
                                <img
                                    alt="error"
                                    src={renderWord(data)[1]}
                                    style={{width: "15rem"}}
                                />
                            </div>
                        ) : (
                            <img
                                alt="error"
                                src={renderWord(data)}
                                style={{width: "15rem"}}
                            />
                        )}
                    </div>
                </div>
            );
        } else {
            return <CircularProgress />;
        }
    };
    return (
        <div className="alphabet-detail-container">
            {renderDetail(alphabetDetail)}
        </div>
    );
};

export default withRouter(AlphabetDetail);
