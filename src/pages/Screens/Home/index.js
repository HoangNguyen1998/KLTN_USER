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
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import IndexRoutes from "routes/IndexRoutes";
import * as GetMeActions from "actions/GetMe";
import styles from "./styles";
const drawerWidth = 250;
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//     },
//     appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//     },
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     drawerContainer: {
//         overflow: "auto",
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));
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
    console.log("trong trang chu: ", getMeRedux);
    useEffect(() => {
        if (!getMeRedux) {
            console.log("get api ne");
            dispatch(Get_Me_Request());
        }
    }, []);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
                        <div onClick={goHome} className="hover" style={{flexGrow: 1, fontSize: "2rem"}}>
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
                                        <NotificationsIcon
                                            style={{
                                                fontSize: 25,
                                                color: "white",
                                                marginRight: 5,
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    className={classes.iconButtonAvatar}
                                    onClick={onSignOut}
                                >
                                    <ExitToAppIcon  style={{
                                                fontSize: 25,
                                                color: "white",
                                                marginRight: 5,
                                            }}/>
                                </IconButton>
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
            {/* <Hidden smUp>
                <Drawer
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    className={classes.drawer}
                    variant="temporary"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            {categories.map(({id, children}) => (
                                <React.Fragment key={id}>
                                    {children.map(
                                        ({id: childId, icon, active}) => (
                                            <ListItem
                                                key={childId}
                                                button
                                                onClick={() =>
                                                    _useListItem(childId)
                                                }
                                                className={clsx(
                                                    classes.item,
                                                    category === childId &&
                                                        classes.itemActiveItem
                                                )}
                                            >
                                                <ListItemIcon
                                                    className={classes.itemIcon}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    classes={{
                                                        primary:
                                                            classes.itemPrimary,
                                                    }}
                                                >
                                                    {t(`${childId}`)}
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    )}

                                    <Divider className={classes.divider} />
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </Hidden> */}
            {/* <Hidden smDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className="user-container">
                        <Avatar className="user-container__avatar" alt="User" src="https://picsum.photos/200" />
                        <div></div>
                    </div>
                    <div className={classes.drawerContainer}>
                        <List>
                            {categories.map(({id, children}) => (
                                <React.Fragment key={id}>
                                    {children.map(
                                        ({id: childId, icon, active}) => (
                                            <ListItem
                                                key={childId}
                                                button
                                                onClick={() =>
                                                    _useListItem(childId)
                                                }
                                                className={`${
                                                    props.history.location ===
                                                    childId
                                                        ? "item-active"
                                                        : ""
                                                }`}
                                            >
                                                <ListItemIcon>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    {t(`${childId}`)}
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    )}

                                    <Divider className={classes.divider} />
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </Hidden> */}
            <Hidden smDown>
                {/* <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                ></Drawer> */}
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
