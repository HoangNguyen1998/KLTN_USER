import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
// import PeopleIcon from "@material-ui/icons/People";
// import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
// import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
// import PublicIcon from "@material-ui/icons/Public";
// import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
// import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
// import TimerIcon from "@material-ui/icons/Timer";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LandscapeIcon from "@material-ui/icons/Landscape";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MessageIcon from "@material-ui/icons/Message";
// import SettingsIcon from "@material-ui/icons/Settings";
// import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
import './styles.scss'

const categories = [
  {
    id: "Learn",
    children: [
      { id: "Courses", icon: <GolfCourseIcon />, active: true },
      { id: "Topics", icon: <MenuBookIcon /> },
      { id: "Challenges", icon: <LandscapeIcon /> }
    ]
  },
  {
    id: "Chat",
    children: [
      { id: "Friends", icon: <PeopleAltIcon /> },
      { id: "Messages", icon: <MessageIcon /> }
    ]
  }
];

const NavigatorCustom = props =>
{
  const { history, classes, ...other } = props
  useEffect(() =>
  {
    categories.map(({ id, children }) =>
    {
      children.map(({ id: childId }) =>
      {
        let checkPathname = `/${ childId }`;
        const { pathname } = props.history.location;
        if (pathname === checkPathname)
        {
          setCategory(childId);
        }
      });
    });
  });
  const [category, setCategory] = useState("Authentication");
  const _useListItem = childId =>
  {
    let checkPathname = `/${ childId.toLowerCase() }`;
    setCategory(childId);
    const { location } = history;
    if (location.pathname !== checkPathname)
    {
      props.history.push(checkPathname);
    }
  };
  const goHome = () =>
  {
    history.push("/")
    setCategory()
  }

  return (
    <Drawer variant="permanent" { ...other }>
      <List disablePadding>
        <ListItem
          style={ { display: "inline-flex", alignItems: "center", height: "4.9rem" } }
          onClick={ goHome }
          className={ clsx(classes.firebase, classes.item, classes.itemCategory) }
        >
          <HomeIcon style={ { fontSize: 30, marginRight: 20 } } />
          Hello
        </ListItem>
        { categories.map(({ id, children }) => (
          <React.Fragment key={ id }>
            <p className="text-navigation">{ id }</p>
            { children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={ childId }
                button
                onClick={ () => _useListItem(childId) }
                className={ clsx(
                  classes.item,
                  category === childId && classes.itemActiveItem
                ) }
              >
                <ListItemIcon className={ classes.itemIcon }>{ icon }</ListItemIcon>
                <ListItemText
                  classes={ {
                    primary: classes.itemPrimary
                  } }
                >
                  { childId }
                </ListItemText>
              </ListItem>
            )) }

            <Divider className={ classes.divider } />
          </React.Fragment>
        )) }
      </List>
    </Drawer>
  );
};

NavigatorCustom.propTypes = {
  classes: PropTypes.object.isRequired
};

const compose = withRouter(NavigatorCustom);

export default withStyles(styles)(compose);
