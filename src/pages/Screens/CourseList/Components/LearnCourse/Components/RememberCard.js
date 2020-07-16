import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import * as CoursesActions from "actions/Courses";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import CircularProgress from "@material-ui/core/CircularProgress";

const RememberCard = () => {
    const [activeWord, setActiveWord] = useState(0);
    const dispatch = useDispatch();
    const [isRotate, setIsRotate] = useState(false);
    const courseRedux = useSelector((state) => state.Courses.course);
    const {contents} = courseRedux;
    const onChangeRotate = async () => {
        await setIsRotate(isRotate + 1);
    };
    const onNextActiveWord = () => {
        setIsRotate(false)
        setActiveWord((prevState) => prevState + 1);
    };
    const onBackActiveWord = () => {
        setIsRotate(false)
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
            xhtml = (
                <div className="remember-card-container__card">
                    <CircularProgress />
                </div>
            );
        } else {
            xhtml = (
                <React.Fragment>
                    {/* {isRotate ? (
                        <div
                            onClick={() => setIsRotate(!isRotate)}
                            className={`remember-card-container__card`}
                        >
                            <div className="font-text">
                                {contents[activeWord].mean}
                            </div>
                        </div>
                    ) : ( */}
                    <div>
                        <div
                            onClick={() => setIsRotate(!isRotate)}
                            className={`remember-card-container__card remember-card-container__card-text ${
                                isRotate
                                    ? "remember-card-container__card-text-rotate"
                                    : ""
                            }`}
                        >
                            <div className="font-text">
                                {isRotate?"":contents[activeWord].text}
                            </div>
                        </div>
                        <div
                            onClick={() => setIsRotate(!isRotate)}
                            className={`remember-card-container__card ${
                                isRotate
                                    ? "remember-card-container__card-mean-rotate"
                                    : "remember-card-container__card-mean"
                            }`}
                        >
                            <div className="font-text">
                                {isRotate?contents[activeWord].mean:""}
                            </div>
                        </div>
                    </div>
                    {/* )} */}
                    <div className="remember-card-container__stepper">
                        <MobileStepper
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
                </React.Fragment>
            );
        }
        return xhtml;
    };
    return <div className="remember-card-container">{renderCard()}</div>;
};

export default RememberCard;
