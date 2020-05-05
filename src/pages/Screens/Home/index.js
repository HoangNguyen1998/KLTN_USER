import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import "styles/global.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import {Get_Me_Request} from "actions/GetMe";
import AppBarCustom from "./Components/AppBarCustom";
import NavigatorCustom from "./Components/NavigatorCustom";
import styles from "./styles";
const drawerWidth = 200;

const Home = (props) => {
    const dispatch = useDispatch();
    const {classes} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const getMeRedux = useSelector((state) => state.GetMe.user);
    console.log("trong trang chu: ", getMeRedux);
    useEffect(() => {
        if (!getMeRedux) {
            console.log("get api ne")
            dispatch(Get_Me_Request());
        }
    }, []);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                    <NavigatorCustom
                        PaperProps={{style: {width: drawerWidth}}}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <NavigatorCustom
                        PaperProps={{style: {width: drawerWidth}}}
                    />
                </Hidden>
            </nav>
            <div className={classes.app}>
                <AppBarCustom onDrawerToggle={handleDrawerToggle} />
            </div>
        </div>
    );
};

export default withStyles(styles)(Home);
