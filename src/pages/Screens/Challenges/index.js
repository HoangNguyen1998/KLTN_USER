import React, {useEffect, useState} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import _ from "lodash";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import * as ChallengesActions from "actions/Challenges";
import ChallengeItem from "./Components/ChallengeItem";
import Loading from "./Components/Loading";
import ChallengeDetail from "./Components/ChallengeDetail";

const Challenges = (props) => {
    const [isWaiting, setIsWaiting] = useState(true);
    const [position, setPosition] = useState(0);
    const [showResult, setShowResult] = useState(0);
    const dispatch = useDispatch();
    const ChallengesRedux = useSelector((state) => {
        return state.Challenges;
    });
    console.log(ChallengesRedux.challenges);
    const {t} = useTranslation("translation");
    useEffect(() => {
        dispatch(ChallengesActions.Get_All_Challenges_Request(setIsWaiting));
        dispatch(
            ChallengesActions.Get_Challenge_Details_Request(
                "5dea0eeb1433d60e205f6a4b"
            )
        );
    }, [dispatch]);
    //func
    const renderListItem = (data) => {
        console.log(data);
        return data.map((item, index) => {
            return (
                <ChallengeItem
                    ChallengeDetail={ChallengesRedux.challengeDetail}
                    onChangeChallenge={onChangeChallenge}
                    cau={index}
                    item={item}
                />
            );
        });
    };
    const onChangeChallenge = (id) => {
        setShowResult(0);
        setPosition(0);
        setIsWaiting(true)
        dispatch(ChallengesActions.Get_Challenge_Details_Request(id, setIsWaiting));
    };

    const renderComment=()=>{
        return <h1>Hello</h1>
    }

    //render
    if (isWaiting) {
        return <Loading />;
    }

    return (
        <div className="container">
            <Grid container style={{height: "90vh"}}>
                <Grid item xs={12} lg={8}>
                    <ChallengeDetail
                        ChallengeDetail={ChallengesRedux.challengeDetail}
                        Challenges={ChallengesRedux.challenges}
                        showResult={showResult}
                        position={position}
                        setPosition={setPosition}
                        setShowResult={setShowResult}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={4}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                >
                    {renderListItem(ChallengesRedux.challenges)}
                </Grid>
            </Grid>
            {renderComment()}
        </div>
    );
};

export default withRouter(withSnackbar(Challenges));
