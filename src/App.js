import React from "react";
import "./App.css";
import { withTranslation, useTranslation } from "react-i18next";
import SignInPage from "../src/pages/SignInPage";
import i18next from "i18next";

const App = props => {
  const { t, i18n } = props;
  // const { t, i18n } = useTranslation(["common", "translation"]);
  const _changeLanguage = lng => {
    console.log(i18n.language);
    i18next.changeLanguage(lng);
  };
  return (
    <div>
      <h1>Trang Chu</h1>
      {/* <h1>Hello</h1>
      <h3>{t("Hello")}</h3>
      <h5>{t("Learn")}</h5>
      <button onClick={() => _changeLanguage("en")}>Tieng Anh</button>
      <button onClick={() => _changeLanguage("vn")}>Tieng Viet</button> */}
    </div>
  );
};

export default withTranslation()(App);
