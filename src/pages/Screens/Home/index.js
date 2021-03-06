import React, {useState, useEffect} from "react";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import "styles/global.scss";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import {Switch, Route, withRouter} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import {Get_Me_Request} from "actions/GetMe";
import AppBarCustom from "./Components/AppBarCustom";
import NavigatorCustom from "./Components/NavigatorCustom";
import SideBar from "./Components/SideBar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuLanguages from "pages/Components/MenuLanguage";
import Tooltip from "@material-ui/core/Tooltip";
import {useTranslation} from "react-i18next";
import NotificationsIcon from "@material-ui/icons/Notifications";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Popover from "@material-ui/core/Popover";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TranslateIcon from "@material-ui/icons/Translate";
import LandscapeIcon from "@material-ui/icons/Landscape";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MessageIcon from "@material-ui/icons/Message";
import * as SocketActions from "actions/Socket";
import * as TimerActions from "actions/Timer";
import {isEmpty} from "lodash";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import IndexRoutes from "routes/IndexRoutes";
import * as GetMeActions from "actions/GetMe";
import styles from "./styles";
import GetToken from "helpers/GetToken";
import callApi from "helpers/ApiCaller";
import GestureIcon from "@material-ui/icons/Gesture";
import Badge from "@material-ui/core/Badge";
import moment from "moment";
import {socket as socketHelper} from "helpers/Socket";
import * as socketConstants from "constants/Socket";
import * as NotifiActions from "actions/Notification";
import * as FriendsActions from "actions/Friends";
const drawerWidth = 250;

var date = new Date();
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
const Home = (props) => {
    const dispatch = useDispatch();
    const {classes} = props;
    const {history} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    const usersRedux = useSelector((state) => state.Friends.listUsers);
    const socket = useSelector((state) => state.Socket.socket);
    const NotificationsRedux = useSelector((state) => {
        return state.Notification;
    });
    const timerReducer = useSelector((state) => state.Timer);
    console.log("trong trang chu: ", getMeRedux);
    // muc ban  be
    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.on(socketConstants.on_EmitFriendOnline, (data) =>
                console.log("xem ban be co onlien ko? ", data)
            );
            return () =>
                socket.removeEventListener(socketConstants.on_EmitFriendOnline);
        }
    });
    useEffect(() => {
        dispatch(FriendsActions.Get_List_Users_Request());
        dispatch(FriendsActions.Get_List_Add_Friend_Request());
    }, []);
    useEffect(() => {
        if (!isEmpty(socket)) {
            socket.on("authenticate", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("validation", (data) => {
                alert(JSON.stringify(data));
            });
            socket.on("emitAddFriend", (res) => {
                if (getMeRedux) {
                    if (getMeRedux._id !== res.userSender) {
                        console.log("Hihi, bat dc roi nha", res.userSender);
                        dispatch(
                            NotifiActions.Add_Notifi({
                                type: "ReceiveAddFriendRequest",
                                id: res.userSender,
                                listUser: usersRedux ? usersRedux : "",
                            })
                        );
                        dispatch(
                            FriendsActions.Request_Friend_Request(
                                res.userSender
                            )
                        );
                    }
                }
            });
            return () => socket.removeEventListener("emitAddFriend");
        }
    });
    useEffect(() => {
        if (isEmpty(socket)) {
            dispatch(SocketActions.Connect_Socket());
        }
        if (!getMeRedux) {
            console.log("get api ne");
            dispatch(Get_Me_Request());
        }
        const d = date.getDate();
        const m = date.getMonth() + 1;
        dispatch(
            TimerActions.Get_Times_Online_Request(
                moment(date).format("DD/MM/YYYY")
            )
        );
        window.addEventListener("unload", (event) => {
            sendTimes();
        });
    }, []);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const sendTimes = async () => {
        localStorage.setItem("testunload", "hihihahahuhu");
        const minute = timerReducer
            ? timerReducer.hours * 60 + timerReducer.minutes - timerReducer.old
            : "";
        let body = {minute, date};
        let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GetToken()}`,
        };
        // await callApi("/timeOnline", "POST", {minute, date});
        let formdata = new FormData(JSON.stringify(body), headers);
        navigator.sendBeacon(
            "https://learn-jp-kltn.herokuapp.com/api/timeOnline"
        );
        // localStorage.setItem("testunload", "huhu");

        // xhr.open(
        //     "POST",
        //     "https://learn-jp-kltn.herokuapp.com/api/timeOnline",
        //     true
        // );
        // xhr.setRequestHeader("Authorization", `Bearer ${GetToken()}`);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.send(JSON.stringify({minute, date}));
    };
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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const onSignOut = () => {
        dispatch(GetMeActions.Sign_Out(history));
        // if(!isEmpty(socket)){
        //     socket
        // }
    };
    return (
        <div className={classes.root}>
            <div className={classes.app}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    className={classes.menuButton}
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <div
                            onClick={goHome}
                            className="hover"
                            style={{flexGrow: 1, fontSize: "2rem"}}
                        >
                            Learn JP
                        </div>
                        <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            style={{flexGrow: 5, width: "auto"}}
                        >
                            <Grid item xs />
                            <Grid item>
                                <MenuLanguages />
                            </Grid>
                            <Grid item>
                                <Tooltip title="Alerts">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleClick}
                                    >
                                        <Badge
                                            badgeContent={
                                                NotificationsRedux &&
                                                NotificationsRedux.Count !== 0
                                                    ? NotificationsRedux.Count
                                                    : 0
                                            }
                                            color="secondary"
                                        >
                                            <NotificationsIcon
                                                style={{
                                                    fontSize: 25,
                                                    color: "white",
                                                }}
                                            />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
            <Hidden smUp>
                <SideBar
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    variant="temporary"
                ></SideBar>
            </Hidden>
            <Hidden smDown>
                <SideBar variant="permanent" />
            </Hidden>
            <main style={{width: "100%", marginTop: "5rem"}}>
                <Switch>
                    {IndexRoutes.map((prop, key) => {
                        return (
                            <Route
                                path={prop.path}
                                exact={prop.exact}
                                component={prop.main}
                                key={key}
                            />
                        );
                    })}
                </Switch>
            </main>
            <Popover
                // id={id}
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className="pop-over">
                    <List>
                        <ListItem button>Hello</ListItem>
                    </List>
                </div>
            </Popover>
        </div>
    );
};
const compose = withRouter(Home);
export default withStyles(styles)(compose);
