import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import {Tooltip, Button} from "@material-ui/core";
import Loading from "pages/Components/Loading";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
// import translate, {parseMultiple} from "google-translate-open-api";
import {Pagination} from "antd";
import * as TopicsActions from "actions/Topics";
// import translate from "translate";
import TopicDetail from "./Components/TopicDetail";

import "./styles.scss";

const Topics = (props) => {
    const [isWaiting, setIsWaiting] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [pageSize, setPageSize] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const {i18n, t} = useTranslation("translation");
    const dispatch = useDispatch();
    const TopicsRedux = useSelector((state) => state.Topics);
    const {topics} = TopicsRedux;
    useEffect(() => {
        if (topics.length === 0) {
            dispatch(TopicsActions.getTopicsRequest(setIsWaiting));
        }
        if (topics.length !== 0) {
            setIsWaiting(false);
        }
    }, [topics.length, dispatch]);
    // FUNC
    const onTranslate = () => {
        const translate = require("google-translate-open-api").default;
        (async () => {
            const result = await translate(`I'm fine.`, {
                tld: "cn",
                to: "zh-CN",
            });
            const data = result.data[0];
            console.log(data);
        })();
    };
    const onGetTopicDetail = (id) => () => {
        props.history.push(`/topics/${id}`);
        // console.log("lay du lieu");
        // setOpenModal(true)
        // dispatch(TopicsActions.gettopicdetailsRequest(id));
    };
    const translateApi = async (word) => {
        // const translate = require('google-translate-open-api').default;
        // const result = await translate("Hello", {
        //     tld: "cn",
        //     to: "zh-CN",
        // });
        // console.log(result.data[0]);
        const {
            getAllLanguage,
            getAllCode,
            isSupport,
        } = require("google-translate-open-api");
        const translate = require("google-translate-open-api").default;
        async function run() {
            const result = await translate("I'm fine.", {
                tld: "cn",
                to: "ja",
            });
            const result2 = await translate("Hoàng còn non lắm", {
                tld: "vi",
                to: "ja",
            });
            const data = result.data[0];
            console.log(data, result2.data[0]);
        }
        run();
    };
    const renderTopic = (data) => {
        if (data) {
            return data.map((item, index) => {
                if (pageNumber * 20 - 20 <= index && index < pageNumber * 20) {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={3}
                            className="flex-row"
                            style={{justifyContent: "center"}}
                        >
                            <div
                                className="item-container"
                                onClick={onGetTopicDetail(item._id)}
                            >
                                <div>
                                    {t("NumberOfLesson")} {item.number}{" "}
                                </div>
                                <div>{item.title}</div>
                            </div>
                        </Grid>
                    );
                }
                return null;
            });
        }
    };
    // RENDER
    if (isWaiting) return <Loading />;
    return (
        <div
            className="container flex-column"
            style={{justifyContent: "space-between"}}
        >
            <Grid className="topic-item-container" container spacing={3}>
                {renderTopic(topics)}
            </Grid>
            <Button onClick={() => translateApi()}>Translate</Button>
            <Pagination
                className="panigation flex-row"
                pageSize={pageSize}
                total={topics ? topics.length : ""}
                current={pageNumber}
                onChange={(page) => setPageNumber(page)}
            />
            <Dialog
                onClose={() => setOpenModal(false)}
                fullScreen
                open={openModal}
            >
                <div className="modal-create-course">
                    <Tooltip className="modal-create-course__icon-close">
                        <IconButton onClick={() => setOpenModal(false)}>
                            <CloseIcon style={{fontSize: 25}} />
                        </IconButton>
                    </Tooltip>
                    {/* <TopicDetail
                    /> */}
                </div>
            </Dialog>
        </div>
    );
};

export default withRouter(withSnackbar(Topics));
