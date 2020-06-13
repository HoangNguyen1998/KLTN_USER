import React, {useEffect, useState} from "react";
import "../styles.scss";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Grid, Button} from "@material-ui/core";
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
        icon: <Note />,
    },
    {
        id: "Learn",
        name: "learn",
        icon: <ImportContacts />,
    },
    {
        id: "Write",
        name: "write",
        icon: <BorderColor />,
    },
    {
        id: "Listen",
        name: "listen",
        icon: <VolumeUp />,
    },
    {
        id: "Test",
        name: "test",
        icon: <PlaylistAddCheck />,
    },
];

const SideBarRight = (props) => {
    const [typeTab, setTypeTab] = useState(null);
    const {type, typeURL, idURL, history} = props;
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
    const renderButton = (data, idURL) => {
        console.log("kiem tra url: ", typeURL);
        return data.map((item, index) => {
            return (
                <Button
                    fullWidth
                    onClick={onChangeType(idURL, item.name)}
                    className={`learn-course-container__header__button ${[
                        typeURL.includes(item.name) ? "general-color" : "",
                    ]}`}
                    startIcon={item.icon}
                >
                    {t(`${item.id}`)}
                </Button>
                // <div
                //     className={`learn-course-container__header__button ${[
                //         typeURL.includes(item.name) ? "general-color" : "",
                //     ]}`}
                //     onClick={onChangeType(idURL, item.name)}
                // >
                //     <div>{item.icon}</div>
                //     <div>{t(`${item.id}`)}</div>
                // </div>
            );
        });
    };
    const onChangeType = (idURL, name) => () => {
        history.push(`/courses/${idURL}/${name}`);
    };
    return (
        <Paper
            style={{minHeight: "100%", height: "100%"}}
            className="learn-course-container"
        >
            <div className="learn-course-container__header">
                {renderButton(categories, idURL)}
            </div>
        </Paper>
    );
};

export default SideBarRight;
