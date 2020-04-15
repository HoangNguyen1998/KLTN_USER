import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import LanguageIcon from "@material-ui/icons/Language";


const MenuLanguages = () => {
  const { i18n, t } = useTranslation("translation");
  const _handleChangeLanguage = () => {
    let currentLanguage = i18n.language;
    if (currentLanguage === "vn") {
      i18n.changeLanguage("en");
    }
    if (currentLanguage === "en") {
      i18n.changeLanguage("vn");
    }
  };
  const _checkCurrentLanguage = () => {
    var lng = null;
    if (i18n.language === "vn") {
      lng = t("ChangeToEN");
    }
    if (i18n.language === "en") {
      lng = t("ChangeToVN");
    }
    return lng;
  };
  return (
    <React.Fragment>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Tooltip
        title={_checkCurrentLanguage()}
        onClick={() => {
          _handleChangeLanguage();
        }}
      >
        <Button style={{fontSize: "1.6rem"}}>
          <LanguageIcon style={{fontSize:25, color:"black", marginRight: 5}}/>
          {i18n.language}
        </Button>
      </Tooltip>
    </div>
    </React.Fragment>
  );
};

export default MenuLanguages
