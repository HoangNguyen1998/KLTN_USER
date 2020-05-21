import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import {useTranslation} from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
// import PeopleIcon from "@material-ui/icons/People";
// import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
// import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
// import PublicIcon from "@material-ui/icons/Public";
// import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
// import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
// import TimerIcon from "@material-ui/icons/Timer";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TranslateIcon from "@material-ui/icons/Translate";
import Toolbar from "@material-ui/core/Toolbar";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import LandscapeIcon from "@material-ui/icons/Landscape";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MessageIcon from "@material-ui/icons/Message";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import Avatar from "@material-ui/core/Avatar";
import styles from "./styles";
// import SettingsIcon from "@material-ui/icons/Settings";
// import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import {withStyles} from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const categories = [
    {
        id: "Learn",
        children: [
            {id: "Courses", icon: <GolfCourseIcon />, active: true},
            {id: "Topics", icon: <MenuBookIcon />},
            {id: "Challenges", icon: <LandscapeIcon />},
            {id: "Alphabet", icon: <TranslateIcon />},
            {id: "Video", icon: <VideoLibraryIcon />},
        ],
    },
    {
        id: "Chat",
        children: [
            {id: "Friends", icon: <PeopleAltIcon />},
            {id: "Messages", icon: <MessageIcon />},
        ],
    },
];

const NavigatorCustom = (props) => {
    const {history, classes, variant, ...other} = props;
    const {i18n, t} = useTranslation("translation");
    useEffect(() => {
        categories.map(({id, children}) => {
            children.map(({id: childId}) => {
                let checkPathname = `/${childId}`;
                const {pathname} = props.history.location;
                if (pathname === checkPathname) {
                    setCategory(childId);
                }
            });
        });
    });
    const userRedux = useSelector((state) => state.GetMe.user);
    const [category, setCategory] = useState("Authentication");
    const _useListItem = (childId) => {
        let checkPathname = "";
        checkPathname = `/${childId.toLowerCase()}`;
        if (childId === "Alphabet") {
            checkPathname = `/${childId.toLowerCase()}/5ea01bed347b3d4180a78540`;
        }
        if (childId === "Challenges") {
            checkPathname = `/${childId.toLowerCase()}/5dea0eeb1433d60e205f6a4b`;
        }
        setCategory(childId);
        const {location} = history;
        if (location.pathname !== checkPathname) {
            props.history.push(checkPathname);
        }
    };
    const goHome = () => {
        history.push("/");
        setCategory();
    };

    const onShowUser = () => {
        history.push("/getme");
    };
    return (
        <Drawer
            variant={variant}
            {...other}
            classes={{paper: classes.drawerPaper}}
            className={classes.drawer}
        >
            <Toolbar />
            <div onClick={onShowUser} className="user-container">
                <Avatar
                    className="user-container__avatar"
                    alt="User"
                    src="https://picsum.photos/200"
                />
                <div className="user-container__name">{userRedux?userRedux.username:""}</div>
            </div>
            <Divider style={{backgroundColor: "#eeeeee"}} variant="middle"/>
            <div className={classes.drawerContainer}>
                <List>
                    {categories.map(({id, children}) => (
                        <React.Fragment key={id}>
                            {children.map(({id: childId, icon, active}) => (
                                <ListItem
                                    key={childId}
                                    button
                                    onClick={() => _useListItem(childId)}
                                    className={`${
                                        props.history.location === childId
                                            ? "item-active"
                                            : ""
                                    }`}
                                >
                                    <ListItemIcon style={{minWidth: "3rem"}}>{icon}</ListItemIcon>
                                    <ListItemText>
                                        {t(`${childId}`)}
                                    </ListItemText>
                                </ListItem>
                            ))}

                        </React.Fragment>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

NavigatorCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};

const compose = withRouter(NavigatorCustom);

export default withStyles(styles)(compose);