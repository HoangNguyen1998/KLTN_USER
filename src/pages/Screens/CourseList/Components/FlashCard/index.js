import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {Button, Grid, Paper} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import * as CoursesActions from "actions/Courses";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import SideBarRight from "pages/Screens/CourseList/Components/SideBarRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

const FlashCard = (props) => {
    const {history} = props;
    const [activeWord, setActiveWord] = useState(0);
    const dispatch = useDispatch();
    const [isRotate, setIsRotate] = useState(false);
    const courseRedux = useSelector((state) => state.Courses.course);
    const {contents} = courseRedux;
    useEffect(() => {
        console.log("Check url: ", props);
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
            dispatch(CoursesActions.Get_Course_Request(props.match.params.id));
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
    return (
        <div className="remember-card-container">
            <Grid container spacing={2} className="container">
                <Grid item lg={2} />
                <Grid
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // width: "100%",
                        // height: "100%",
                        // minHeight: "100%",
                    }}
                    item
                    xs={12}
                    lg={6}
                >
                    {renderCard()}
                </Grid>
                <Grid item xs={12} lg={2}>
                    <SideBarRight
                        history={props.history}
                        idURL={props.match.params.id}
                        typeURL={props.match.path}
                    />
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={12}>
                    <Paper>Hello</Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(FlashCard);
