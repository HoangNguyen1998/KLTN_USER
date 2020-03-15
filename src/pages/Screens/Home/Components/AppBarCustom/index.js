import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
import './styles.scss'
import IndexRoutes from "routes/IndexRoutes"
import MenuLanguages from "pages/Components/MenuLanguage";
import CourseList from "pages/Screens/CourseList";
import checkAuthen from 'helpers/GetToken'

const AppBarCustom = props =>
{
  const { classes, onDrawerToggle } = props;
  console.log(IndexRoutes)
  console.log(checkAuthen())
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={ 0 } className="test">
        <Toolbar>
          <Grid container spacing={ 1 } alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={ onDrawerToggle }
                  className={ classes.menuButton }
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <MenuLanguages />
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon style={ { fontSize: 25, color: "white", marginRight: 5 } } />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={ classes.iconButtonAvatar }>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Switch>
        { IndexRoutes.map((prop, key) =>
        {
          return (<Route path={ prop.path } exact={ prop.exact } component={ prop.main } key={ key } />)
        }) }
      </Switch>
      <Popover
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        } }
      >
        The content of the Popover.
</Popover>
    </React.Fragment>
  );
};

AppBarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(AppBarCustom);
