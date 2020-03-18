import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {Tooltip} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

import * as CoursesActions from "actions/Courses";
import AddCourse from "./Components/AddCourse";
import "./styles.scss";

const CourseList = props => {
    const [openDialog, setOpenDialog] = useState(false);
    const [showStar, setShowStar] = useState(false);
    const {i18n, t} = useTranslation("translation");
    const dispatch = useDispatch();
    const {history, enqueueSnackbar} = props;
    const Courses = useSelector(state => {
        console.log(state);
        return state.Courses;
    });
    const {courses, showModal} = Courses;
    console.log(courses.length);
    useEffect(() => {
        if (courses.length === 0) {
            console.log("Hello");
            dispatch(CoursesActions.Get_All_Courses_Request());
        }
    }, []);
    const renderCourses = courses => {
        if (courses.length !== 0) {
            let xhtml = null;
            xhtml = courses.map((item, index) => {
                return (
                    <Grid item xs={12} lg={4} key={index}>
                        <div className="paper-container">
                            <Paper className="paper">
                                <div className="paper-custom__image">
                                    {item.showStar ? (
                                        <StarIcon
                                            onClick={() =>
                                                (item.showStar = !!!item.showStar)
                                            }
                                            style={{
                                                fontSize: 30,
                                                margin: "0.5rem 0.5rem 0 0",
                                                color: "yellow"
                                            }}
                                        />
                                    ) : (
                                        <StarBorderIcon
                                            onClick={() =>
                                                (item.showStar = !!!item.showStar)
                                            }
                                            style={{
                                                fontSize: 30,
                                                margin: "0.5rem 0.5rem 0 0"
                                            }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h4 style={{textAlign: "center"}}>
                                        {item.title}
                                    </h4>
                                </div>
                            </Paper>
                        </div>
                    </Grid>
                );
            });
            return xhtml;
        }
        return null;
    };
    const onShowCreateCourse = () => {
        dispatch(CoursesActions.Show_Modal_Add_Course(true));
    };
    const onHideCreateCourse = () => {
        dispatch(CoursesActions.Show_Modal_Add_Course(false));
    };
    return (
        <div className="courses-list-container">
            {/* Nut tao khoa hoc */}
            <div className="button">
                <Tooltip title={t("CreateCourse")}>
                    <IconButton
                        className="general-color"
                        onClick={onShowCreateCourse}
                    >
                        <AddCircleIcon style={{fontSize: 40}} />
                    </IconButton>
                </Tooltip>
            </div>
            {/* Render ra cac khoa hoc cua nguoi dung da tao */}
            <Grid container spacing={3}>
                {renderCourses(courses)}
            </Grid>
            {/* Hien thi Dialog tao khoa hoc */}
            <Dialog onClose={onHideCreateCourse} fullScreen open={showModal}>
                <div className="modal-create-course">
                    <Tooltip className="modal-create-course__icon-close">
                        <IconButton onClick={onHideCreateCourse}>
                            <CloseIcon style={{fontSize: 25}} />
                        </IconButton>
                    </Tooltip>
                    <AddCourse
                        history={history}
                        enqueueSnackbar={enqueueSnackbar}
                        t={t}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default withRouter(withSnackbar(CourseList));
