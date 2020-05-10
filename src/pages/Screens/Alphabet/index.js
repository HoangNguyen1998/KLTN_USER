import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import Loading from "pages/Components/Loading";
import {withRouter} from "react-router-dom";
import * as AlphabetActions from "actions/Alphabet";
import {Tabs} from "antd";
import Grid from "@material-ui/core/Grid";
import AlphabetItem from "./Components/AlphabetItem";
import AlphabetDetail from "./Components/AlphabetDetail";
import Media from "react-media";
import Speech from "speak-tts";

import "./styles.scss";

const Alphabet = (props) => {
    // STATE
    const [isWaiting, setIsWaiting] = useState(true);
    const [valueTab, setValueTab] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
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
                                <Grid
                                    spacing={3}
                                    container
                                    item
                                    xs={12}
                                >
                                    {renderAlphabet(alphabetRedux)}
                                </Grid>
                            </Grid>
                        </TabPane>
                        <TabPane tab="Katakana" key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        valueTab={valueTab}
                                        onSpeak={onSpeak}
                                    />
                                </Grid>
                                <Grid
                                    spacing={3}
                                    container
                                    item
                                    xs={12}

                                >
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
                            <Grid container spacing={3}>
                                <Grid
                                    spacing={3}
                                    container
                                    item
                                    xs={12}
                                    md={9}
                                    sm={9}
                                    lg={9}
                                >
                                    {renderAlphabet(alphabetRedux)}
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        onSpeak={onSpeak}
                                        valueTab={valueTab}
                                    />
                                </Grid>
                            </Grid>
                        </TabPane>
                        <TabPane tab="Katakana" key="2">
                            <Grid container spacing={3}>
                                <Grid
                                    spacing={3}
                                    container
                                    item
                                    xs={12}
                                    md={9}
                                    sm={9}
                                    lg={9}
                                >
                                    {renderAlphabet(alphabetRedux)}
                                </Grid>
                                <Grid item xs={12} lg={3}>
                                    <AlphabetDetail
                                        isLoading={isLoading}
                                        valueTab={valueTab}
                                        onSpeak={onSpeak}
                                    />
                                </Grid>
                            </Grid>
                        </TabPane>
                    </Tabs>
                )}
            />
        </div>
    );
};

export default withRouter(withSnackbar(Alphabet));
