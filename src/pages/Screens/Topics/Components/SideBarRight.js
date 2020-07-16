import React, {useEffect, useState} from "react";
import "../styles.scss";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import * as CoursesActions from "actions/Courses";
import {Paper, Grid, Button} from "@material-ui/core";
import {Progress} from "antd";
import {
    ImportContacts,
    Note,
    VolumeUp,
    PlaylistAddCheck,
    BorderColor,
} from "@material-ui/icons";

const categories = [
    {
        id: "FlashCard",
        name: "flash-card",
        icon: <Note style={{fontSize: 25}} />,
    },
    {
        id: "Learn",
        name: "learn",
        icon: <ImportContacts style={{fontSize: 25}} />,
    },
    {
        id: "Write",
        name: "write",
        icon: <BorderColor style={{fontSize: 25}} />,
    },
    {
        id: "Listen",
        name: "listen",
        icon: <VolumeUp style={{fontSize: 25}} />,
    },
];

const SideBarRight = (props) => {
    const [typeTab, setTypeTab] = useState(null);
    const {type, typeURL, idURL, history} = props;
    const dispatch = useDispatch();
    const coursesRedux = useSelector((state) => state.Courses.courses);
    const {t} = useTranslation("translation");
    // const LearnRedux=useSelector(state=>state.)
    useEffect(() => {
        setTypeTab(type);
    }, [type]);
    const onChangeTab = (type) => () => {
        if (type !== typeTab) {
            setTypeTab(type);
        }
    };
    const renderRecentCourses = (data) => {
        if (data) {
            return data.map((item, index) => {
                return (
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
                            style={{
                                fontWeight: "bolder",
                                fontSize: "2rem",
                                wordBreak: "break-word",
                            }}
                        >
                            {item.title}
                        </div>
                        <div>
                            {item.contents.length} {t("Word")}
                        </div>
                        {/* {props.match.params.id === item._id ? (
                                <div
                                    style={{
                                        borderRadius: "1rem",
                                        height: "1rem",
                                        backgroundColor: "#009be5",
                                    }}
                                ></div>
                            ) : (
                                ""
                            )} */}
                        <div>
                            <Progress
                                strokeColor={{
                                    "0%": "#108ee9",
                                    "100%": "#87d068",
                                }}
                                percent={item.master?item.master.toFixed(0):""}
                            />
                        </div>
                    </Paper>
                );
            });
        }
    };
    const renderButton = (data, idURL) => {
        console.log("kiem tra url: ", typeURL);
        return data.map((item, index) => {
            return (
                // <Button
                //     fullWidth
                //     onClick={onChangeType(idURL, item.name)}
                //     className={`learn-course-container__header__button ${[
                //         typeURL.includes(item.name) ? "general-color" : "",
                //     ]}`}
                //     startIcon={item.icon}
                // >
                //     {t(`${item.id}`)}
                // </Button>
                <div
                    className={`sidebar-course-container__button-container__item ${[
                        typeURL.includes(item.name) ? "general-color" : "",
                    ]}`}
                    onClick={onChangeType(idURL, item.name)}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "3rem",
                        }}
                    >
                        {item.icon}
                    </div>
                    <div>{t(`${item.id}`)}</div>
                </div>
            );
        });
    };
    const onChangeType = (idURL, name) => () => {
        history.push(`/courses/${idURL}/${name}`);
    };
    return (
        <div
            style={{minHeight: "100%", height: "100%"}}
            className="sidebar-course-container"
        >
            <div style={{marginLeft: "1rem"}}>
                <h2 style={{margin: 0, color: "#2C6694"}}>{t("ToolBar")}</h2>
            </div>
            <div className="sidebar-course-container__button-container">
                {renderButton(categories, idURL)}
            </div>
            <div style={{marginLeft: "1rem", marginTop: "3rem"}}>
                <h2 style={{margin: 0, color: "#2C6694"}}>
                    {t("RecentCourses")}
                </h2>
            </div>
            <div className="recent-courses-container">
                {renderRecentCourses(coursesRedux)}
            </div>
        </div>
    )
};

export default withRouter(SideBarRight);
