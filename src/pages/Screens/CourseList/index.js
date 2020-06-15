import React, {useEffect, useState, useRef} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Loading from "./Components/Loading";
import * as TimerActions from "actions/Timer";
import * as CoursesActions from "actions/Courses";
// import AddCourseModal from "./Components/AddCourseModal";
import Course from "./Components/Course";
import LearnCourse from "./Components/LearnCourse";
var timeVar;
const CourseList = (props) => {
    const [listCourse, setListCourse] = useState([]);
    const [isWaiting, setIsWaiting] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [openModalCreateCourse, setOpenModalCreateCourse] = useState(false);
    const [typeOfModalCourse, setTypeOfModalCourse] = useState(null);
    const [openModalCourse, setOpenModalCourse] = useState(false);
    const {i18n, t} = useTranslation("translation");
    const dispatch = useDispatch();
    const {history, enqueueSnackbar} = props;
    const Courses = useSelector((state) => {
        return state.Courses;
    });
    const {courses} = Courses;
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(CoursesActions.Get_All_Courses_Request(setIsWaiting));
        }
        if (courses.length !== 0) {
            setIsWaiting(false);
            // timeVar = setInterval(function () {
            //     console.log("Hello");
            //     dispatch(TimerActions.Increase_Second())
            // }, 1000);
        }
        // return ()=>{clearInterval(timeVar)}
    }, [courses.length, dispatch]);
    const renderCourses = (courses) => {
        if (courses.length !== 0) {
            let xhtml = null;
            xhtml = courses.map((item, index) => {
                if (index + 1 <= page * size) {
                    return (
                        <Course
                            onShowCourse={onShowCourse}
                            key={index}
                            item={item}
                            index={index}
                        />
                    );
                }
            });
            return xhtml;
        }
        return null;
    };
    const cc = () => {
        dispatch(TimerActions.Increase_Second());
    };
    const onShowCreateCourse = () => {
        // setOpenModalCreateCourse(true);
        history.push("/courses/create");
    };
    const onHideCreateCourse = () => {
        setOpenModalCreateCourse(false);
    };
    const onShowCourse = (type) => {
        setOpenModalCourse(true);
        setTypeOfModalCourse(type);
    };
    const onHideCourse = () => {
        setOpenModalCourse(false);
        setTypeOfModalCourse(null);
        dispatch(CoursesActions.Reset_Course_Modal());
    };
    const onLoadCourses = () => {
        setPage(page + 1);
    };
    if (isWaiting) {
        return <Loading />;
    }
    if (courses.length !== 0) {
        return (
            <div>
                {/* Nut tao khoa hoc */}
                <div className="button">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onShowCreateCourse}
                        startIcon={<AddIcon />}
                    >
                        {t("CreateCourse")}
                    </Button>
                </div>
                {/* Render ra cac khoa hoc cua nguoi dung da tao */}
                <Grid style={{width: "100%", margin: 0}} container spacing={3}>
                    {renderCourses(courses)}
                </Grid>
                {/* Nut load khoa hoc */}
                <div className="button-load-container">
                    <div className="button-load-container__page-number">
                        {page * size > courses.length
                            ? courses.length
                            : page * size}
                        /{courses ? courses.length : ""}
                    </div>
                    <Button
                        className="button-load-container__button-load"
                        variant="contained"
                        color="secondary"
                        onClick={onLoadCourses}
                        disabled={page * size >= courses.length}
                    >
                        {t("LoadMore")}
                    </Button>
                </div>
                {/* Hien thi modal hoc va kiem tra khoa hoc */}
                <Dialog
                    onClose={onHideCourse}
                    fullScreen
                    open={openModalCourse}
                >
                    <div className="modal-create-course">
                        <Tooltip className="modal-create-course__icon-close">
                            <IconButton onClick={onHideCourse}>
                                <CloseIcon style={{fontSize: 25}} />
                            </IconButton>
                        </Tooltip>
                        <LearnCourse
                            openModalCourse={openModalCourse}
                            history={history}
                            enqueueSnackbar={enqueueSnackbar}
                            t={t}
                            type={typeOfModalCourse}
                        />
                    </div>
                </Dialog>
            </div>
        );
    } else
        return (
            <div className="container">
                <div className="button">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onShowCreateCourse}
                        startIcon={<AddIcon />}
                    >
                        {t("CreateCourse")}
                    </Button>
                </div>
                <div className="courses-list-container__blank-courses">
                    <p>{t("BlankCourses")}</p>
                </div>
            </div>
        );
};

export default withRouter(withSnackbar(CourseList));
