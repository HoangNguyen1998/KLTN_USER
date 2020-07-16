import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import Loading from "pages/Components/Loading";
import {withRouter} from "react-router-dom";
import * as AlphabetActions from "actions/Alphabet";
import {Tabs} from "antd";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AlphabetItem from "./Components/AlphabetItem";
import AlphabetDetail from "./Components/AlphabetDetail";
import Media from "react-media";
import {useSvgDrawing} from "react-hooks-svgdrawing";
import Speech from "speak-tts";

import "./styles.scss";
import {Paper} from "@material-ui/core";

const Alphabet = (props) => {
    // STATE
    const [isWaiting, setIsWaiting] = useState(true);
    const [valueTab, setValueTab] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [renderRef, action] = useSvgDrawing({
        penWidth: 5, // pen width
        penColor: "#1890ff", // pen color
        width: 300, // drawing area width
        height: 200, // drawing area height
    });
    const [renderRef1, action1] = useSvgDrawing({
        penWidth: 5, // pen width
        penColor: "#1890ff", // pen color
        width: 300, // drawing area width
        height: 200, // drawing area height
    });
    // DEFINE
    const {TabPane} = Tabs;
    const {id} = props.match.params;
    const speech = new Speech();
    // REDUX
    const dispatch = useDispatch();
    const alphabetRedux = useSelector((state) => state.Alphabet.alphabet);
    // USEEFFECT
    useEffect(() => {
        dispatch(AlphabetActions.Get_All_Alphabet_Request(setIsWaiting));
        dispatch(
            AlphabetActions.Get_Alphabet_Detail_Request(
                id ? id : "5ea01bed347b3d4180a78540",
                setIsLoading
            )
        );
    }, []);
    // FUNC
    const changeWord = (id) => {
        setIsLoading(true);
        dispatch(AlphabetActions.Get_Alphabet_Detail_Request(id, setIsLoading));
    };
    const onSpeak = (word) => {
        if (word.charCodeAt() > parseInt(0x3040)) speech.setLanguage("ja-JP");
        else speech.setLanguage("en-US");
        speech.setRate(0.7);
        speech.setPitch(1);
        speech.speak({
            text: `${word}`,
        });
    };
    const pauseSpeak = () => {
        speech.cancel();
    };
    const renderAlphabet = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <AlphabetItem
                        list={alphabetRedux}
                        valueTab={valueTab}
                        item={item}
                        changeWord={changeWord}
                    />
                );
            });
        }
    };

    //RENDER
    if (isWaiting) return <Loading />;
    return (
        <div className="container">
            <Media
                query="(max-width: 768px)"
                render={() => (
                    <Tabs
                        style={{marginBottom: "1rem"}}
                        onChange={(activeKey) => setValueTab(activeKey)}
                        defaultActiveKey="1"
                    >
                        <TabPane tab="Hiragana" key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        onSpeak={onSpeak}
                                        valueTab={valueTab}
                                    />
                                </Grid>
                                <Grid spacing={3} container item xs={12}>
                                    {renderAlphabet(alphabetRedux)}
                                </Grid>
                            </Grid>
                        </TabPane>
                        <TabPane tab="Katakana" key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="container">
                                        <div
                                            ref={renderRef}
                                            style={{
                                                marginTop: "1rem",
                                                width: "100%",
                                                height: "50%",
                                                border: "1px solid black",
                                                margin: "auto",
                                            }}
                                        ></div>
                                        <div style={{marginTop: "1rem"}}>
                                            <Button onClick={action.clear}>
                                                Clear
                                            </Button>
                                            <Button onClick={action.download}>
                                                Dowload
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid spacing={3} container item xs={12}>
                                    {renderAlphabet(alphabetRedux)}
                                </Grid>
                            </Grid>
                        </TabPane>
                    </Tabs>
                )}
            />
            <Media
                query="(min-width: 769px)"
                render={() => (
                    <Tabs
                        style={{marginBottom: "1rem"}}
                        onChange={(activeKey) => setValueTab(activeKey)}
                        defaultActiveKey="1"
                    >
                        <TabPane tab="Hiragana" key="1">
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item lg={6}>
                                        <Paper
                                            style={{
                                                minHeight: "45rem",
                                                maxHeight: "45rem",
                                            }}
                                        >
                                            <AlphabetDetail
                                                isLoading={isLoading}
                                                onSpeak={onSpeak}
                                                valueTab={valueTab}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={6}>
                                    <Paper
                                            style={{
                                                minHeight: "45rem",
                                                maxHeight: "45rem",
                                            }}
                                        >
                                            <div className="container" style={{height: "45rem"}}>
                                                <div
                                                    ref={renderRef}
                                                    style={{
                                                        marginTop: "1rem",
                                                        width: "100%",
                                                        height: "85%",
                                                        border:
                                                            "1px solid black",
                                                        margin: "auto",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{marginTop: "1rem"}}
                                                >
                                                    <Button
                                                        onClick={action.clear}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            action.download
                                                        }
                                                    >
                                                        Dowload
                                                    </Button>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <Grid container spacing={3}>
                                    <Grid
                                        spacing={3}
                                        container
                                        item
                                        xs={12}
                                        md={9}
                                        sm={9}
                                        lg={12}
                                    >
                                        {renderAlphabet(alphabetRedux)}
                                    </Grid>
                                    {/* <Grid item xs={12} lg={3}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        onSpeak={onSpeak}
                                        valueTab={valueTab}
                                    />
                                </Grid> */}
                                </Grid>
                            </div>
                        </TabPane>
                        <TabPane tab="Katakana" key="2">
                        <div>
                                <Grid container spacing={3}>
                                    <Grid item lg={6}>
                                        <Paper
                                            style={{
                                                minHeight: "45rem",
                                                maxHeight: "45rem",
                                            }}
                                        >
                                            <AlphabetDetail
                                                isLoading={isLoading}
                                                onSpeak={onSpeak}
                                                valueTab={valueTab}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={6}>
                                    <Paper
                                            style={{
                                                minHeight: "45rem",
                                                maxHeight: "45rem",
                                            }}
                                        >
                                            <div className="container" style={{height: "45rem"}}>
                                                <div
                                                    ref={renderRef1}
                                                    style={{
                                                        marginTop: "1rem",
                                                        width: "100%",
                                                        height: "85%",
                                                        border:
                                                            "1px solid black",
                                                        margin: "auto",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{marginTop: "1rem"}}
                                                >
                                                    <Button
                                                        onClick={action1.clear}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            action1.download
                                                        }
                                                    >
                                                        Dowload
                                                    </Button>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <Grid container spacing={3}>
                                    <Grid
                                        spacing={3}
                                        container
                                        item
                                        xs={12}
                                        md={9}
                                        sm={9}
                                        lg={12}
                                    >
                                        {renderAlphabet(alphabetRedux)}
                                    </Grid>
                                    {/* <Grid item xs={12} lg={3}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        onSpeak={onSpeak}
                                        valueTab={valueTab}
                                    />
                                </Grid> */}
                                </Grid>
                            </div>
                        </TabPane>
                    </Tabs>
                )}
            />
        </div>
    );
};

export default withRouter(withSnackbar(Alphabet));
