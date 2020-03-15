import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import 'styles/global.scss'
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";

import AppBarCustom from "./Components/AppBarCustom";
import NavigatorCustom from "./Components/NavigatorCustom"
import styles from "./styles";
const drawerWidth = 200;

const Home = props => {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <NavigatorCustom
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <NavigatorCustom PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <AppBarCustom onDrawerToggle={handleDrawerToggle} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
