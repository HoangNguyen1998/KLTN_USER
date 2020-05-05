import React, {useEffect, useState} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import NoteIcon from "@material-ui/icons/Note";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import RememberCard from "./Components/RememberCard";
import LearnTab from "./Components/LearnTab";

const LearnCourseModal = (props) => {
    const [typeTab, setTypeTab] = useState(null);
    const {type, t} = props;
    // const LearnRedux=useSelector(state=>state.)
    useEffect(() => {
        setTypeTab(type);
    }, [type]);
    const onChangeTab = (type) => () => {
        if (type !== typeTab) {
            setTypeTab(type);
        }
    };
    const renderLearn = () => {
        return (
            <div className="learn-course-container__body">This is learn</div>
        );
    };
    return (
        <Grid container className="learn-course-container" spacing={10}>
            <Grid item xs={2} lg={4}>
                <div className="learn-course-container__header">
                    <Button
                        fullWidth
                        onClick={onChangeTab(0)}
                        className={`learn-course-container__header__button ${[
                            typeTab === 0 ? "general-color" : "",
                        ]}`}
                        startIcon={<NoteIcon />}
                    >
                        {t("FlashCard")}
                    </Button>
                    <Button
                        fullWidth
                        onClick={onChangeTab(1)}
                        className={`learn-course-container__header__button ${[
                            typeTab === 1 ? "general-color" : "",
                        ]}`}
                        startIcon={<ImportContactsIcon />}
                    >
                        {t("Learn")}
                    </Button>
                    <Button
                        fullWidth
                        onClick={onChangeTab(2)}
                        className={`learn-course-container__header__button ${[
                            typeTab === 2 ? "general-color" : "",
                        ]}`}
                        startIcon={<BorderColorIcon />}
                    >
                        {t("Write")}
                    </Button>
                    <Button
                        fullWidth
                        onClick={onChangeTab(3)}
                        className={`learn-course-container__header__button ${[
                            typeTab === 3 ? "general-color" : "",
                        ]}`}
                        startIcon={<VolumeUpIcon />}
                    >
                        {t("Listen")}
                    </Button>
                    <Button
                        fullWidth
                        onClick={onChangeTab(4)}
                        className={`learn-course-container__header__button ${[
                            typeTab === 4 ? "general-color" : "",
                        ]}`}
                        startIcon={<PlaylistAddCheckIcon />}
                    >
                        {t("Test")}
                    </Button>
                </div>
            </Grid>
            <Grid item xs={10} lg={8}>
                {typeTab === 0 ? <RememberCard /> : ""}
                {typeTab === 1 ? <LearnTab /> : ""}
                {typeTab === 2 ? renderLearn() : ""}
                {typeTab === 3 ? renderLearn() : ""}
                {typeTab === 4 ? renderLearn() : ""}
            </Grid>
        </Grid>
    );
};

export default LearnCourseModal;
