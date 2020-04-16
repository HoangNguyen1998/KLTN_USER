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
import Countdown from "react-countdown-now";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
const LearnTab = () => {
    const courseRedux = useSelector((state) => state.Courses.courseLearn);
    const [activeWord, setActiveWord] = useState(0);
    const [countDown, setCountDown] = useState(3);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();

    //func
    const onCheckReady = () => {
        let countDown = setInterval(() => {
            setCountDown((prevCount) => {
                if (prevCount === 0) {
                    setIsReady(true);
                    clearInterval(countDown);
                } else return prevCount - 1;
            });
        }, 1000);
    };

    const renderQuestion = (data) => {
        if (data === null) {
            return <CircularProgress />;
        }
        if (data) {
            return (
                <div>
                    <h3>{activeWord + 1}</h3>
                    <Grid container>{renderAnswer(data[activeWord])}</Grid>
                </div>
            );
        }
    };
    const renderAnswer = data =>{
        console.log(data)
        data.answer.map((item, index)=>{
            
        })
    }

    //render
    return (
        <div className="learn-tab-container">
            {/* {!isReady ? (
                <div className="learn-tab-container__ready">
                    <div className="font-custom16">Ban da san sang?</div>
                    <Button onClick={onCheckReady}>Yes</Button>
                    <Button>No</Button>
                    <div>{countDown}</div>
                </div>
            ) : ( */}
            {renderQuestion(courseRedux)}
            {/* )} */}
        </div>
    );
};

export default LearnTab;
