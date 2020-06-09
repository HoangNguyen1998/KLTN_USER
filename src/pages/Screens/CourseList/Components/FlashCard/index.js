import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {useTranslation} from "react-i18next";
import {Button, Grid, Paper} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import * as CoursesActions from "actions/Courses";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SideBarRight from "pages/Screens/CourseList/Components/SideBarRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Tabs, Carousel} from "antd";
import {EditOutlined, BarChartOutlined} from "@ant-design/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import History from "./Components/History";
import RecentCourses from "./Components/RecentCourses";
import EditCourse from "./Components/EditCourse";
import * as TimerActions from "actions/Timer";
var timeVar
const {TabPane} = Tabs;
const FlashCard = (props) => {
    const {history} = props;
    const [isWaiting, setIsWaiting] = useState(true);
    const {t} = useTranslation("translation");
    const [activeWord, setActiveWord] = useState(0);
    const dispatch = useDispatch();
    const [isRotate, setIsRotate] = useState(false);
    const courseRedux = useSelector((state) => state.Courses.course);
    const coursesRedux = useSelector((state) => state.Courses.courses);
    const {contents} = courseRedux;
    useEffect(() => {
        console.log("Check url: ", props);
        if (coursesRedux.length === 0) {
            dispatch(CoursesActions.Get_All_Courses_Request(setIsWaiting));
        }
        if(contents.length===0){
            dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
}
        // if (contents.length === 0) {
        //     dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
        // }
    }, []);
    useEffect(() => {
            timeVar = setInterval(function () {
                console.log("Hello");
                dispatch(TimerActions.Increase_Second())
            }, 1000);
        return ()=>{
            clearInterval(timeVar)
        }
    }, []);
    const onChangeRotate = async () => {
        await setIsRotate(isRotate + 1);
    };
    const onNextActiveWord = () => {
        setIsRotate(false);
        setActiveWord((prevState) => prevState + 1);
    };
    const onBackActiveWord = () => {
        setIsRotate(false);
        setActiveWord((prevState) => prevState - 1);
    };
    // useEffect(() => {
    //     return () => {
    //         dispatch(CoursesActions.Reset_Course_Modal())
    //         console.log("djfhldghsldjfkghjsdghlksdfjhglkdshfgklhsdjklghklsdhgldsg")
    //         setDetailData([])
    //     };
    // }, []);
    const renderCard = () => {
        let xhtml = null;
        if (contents.length === 0) {
            // dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
            xhtml = (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Skeleton
                        variant="rect"
                        className={`remember-card-container__card remember-card-container__card-text`}
                    >
                        {/* <div className="font-text">
                            <Skeleton variant="text"/>
                        </div> */}
                    </Skeleton>
                </div>
            );
        } else {
            xhtml = (
                <div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Paper
                            elevation={0}
                            onClick={() => setIsRotate(!isRotate)}
                            className={`remember-card-container__card remember-card-container__card-text ${
                                isRotate
                                    ? "remember-card-container__card-text-rotate"
                                    : ""
                            }`}
                        >
                            <div className="font-text">
                                {isRotate ? "" : contents[activeWord].text}
                            </div>
                        </Paper>
                        <Paper
                            elevation={0}
                            onClick={() => setIsRotate(!isRotate)}
                            className={`remember-card-container__card ${
                                isRotate
                                    ? "remember-card-container__card-mean-rotate"
                                    : "remember-card-container__card-mean"
                            }`}
                        >
                            <div className="font-text">
                                {isRotate ? contents[activeWord].mean : ""}
                            </div>
                        </Paper>
                    </div>
                    <div className="remember-card-container__stepper">
                        <MobileStepper
                            style={{maxWidth: "50rem", minWidth: "50rem"}}
                            variant="text"
                            steps={contents ? contents.length : ""}
                            position="static"
                            activeStep={activeWord}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={onNextActiveWord}
                                    disabled={
                                        activeWord + 1 === contents.length
                                    }
                                >
                                    Next
                                    <KeyboardArrowRight />
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={onBackActiveWord}
                                    disabled={activeWord === 0}
                                >
                                    <KeyboardArrowLeft />
                                    Back
                                </Button>
                            }
                        ></MobileStepper>
                    </div>
                </div>
            );
        }
        return xhtml;
    };
    const renderRecentCourses = (data) => {
        if (data) {
            return data.map((item, index) => {
                return (
                    <Grid item xs={12} lg={6}>
                        <Paper
                            onClick={() => {
                                history.push(`/courses/${item._id}/flash-card`);
                                dispatch(
                                    CoursesActions.Get_Course_Request(item._id)
                                );
                                window.scrollTo(0, 0);
                            }}
                            className="recent-courses-container__item-container"
                            elevation={3}
                        >
                            <div
                                style={{fontWeight: "bolder", fontSize: "2rem"}}
                            >
                                {item.title}
                            </div>
                            <div>
                                {item.contents.length} {t("Word")}
                            </div>
                            {props.match.params.id === item._id ? (
                                <div
                                    style={{
                                        borderRadius: "1rem",
                                        height: "2rem",
                                        backgroundColor: "#009be5",
                                    }}
                                ></div>
                            ) : (
                                ""
                            )}
                        </Paper>
                    </Grid>
                );
            });
        }
    };
    return (
        <div className="remember-card-container">
            <Grid container spacing={2} className="container">
                <Grid item lg={2} xs={0} />
                <Grid
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // width: "100%",
                        // height: "100%",
                        minHeight: "50rem",
                    }}
                    item
                    xs={12}
                    lg={6}
                >
                    {renderCard()}
                </Grid>
                <Grid style={{minHeight: "50rem"}} item xs={12} lg={2}>
                    <SideBarRight
                        history={props.history}
                        idURL={props.match.params.id}
                        typeURL={props.match.path}
                    />
                </Grid>
                <Grid item lg={2} xs={0} />
                <Grid item lg={6}>
                    <Paper className="edit-course-container" elevation={0}>
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                        <BarChartOutlined />
                                        Your History
                                    </span>
                                }
                                key="1"
                            >
                                <History />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <EditOutlined />
                                        Edit Courses
                                    </span>
                                }
                                key="2"
                            >
                                <EditCourse />
                            </TabPane>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item lg={6}>
                    <Paper elevation={0} className="recent-courses-container">
                        <div
                            style={{
                                marginBottom: "2rem",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            {t("RecentCourses")}
                        </div>
                        <div>
                            <Grid container spacing={2}>
                                {renderRecentCourses(coursesRedux)}
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(FlashCard);
