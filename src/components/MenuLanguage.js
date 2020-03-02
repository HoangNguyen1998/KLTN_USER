import React, { useState, useRef, useEffect } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import IconButton from "@material-ui/core/IconButton";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const MenuLanguage = props => {
  const { i18n, _handleChangeLanguage, _checkCurrentLanguage } = props;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Tooltip
        title={_checkCurrentLanguage()}
        onClick={() => {
          _handleChangeLanguage();
        }}
      >
        <Button>
          <LanguageIcon />
          {i18n.language}
        </Button>
      </Tooltip>
    </div>
  );
};

export default MenuLanguage;
