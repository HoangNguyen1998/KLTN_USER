import React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { withFormik } from "formik";
import { withSnackbar } from "notistack";
import * as Yup from "yup";

import SignIn from "../components/SignIn";
import * as SignInActions from "../actions/SignIn";
import CheckAuthen from "../helpers/GetToken";

const SignInPage = props => {
  //   useEffect(() => {
  //     if (CheckAuthen()) {
  //       const { history } = props;
  //       history.push("/");
  //     }
  //   });
  const { i18n, t } = useTranslation("translation");
  const dispatch = useDispatch();
  const {
    history,
    values,
    setFieldValue,
    handleChange,
    touched,
    setFieldTouched,
    handleBlur,
    enqueueSnackbar,
    errors
  } = props;
  const { username, password, remember } = values;
  const [showPassword, setShowPassword] = useState(false);
  const _onHandleSubmit = event => {
    event.preventDefault();
    var user = {
      username: username,
      password: password,
      remember: remember
    };
    if (username !== "" && password !== "") {
      dispatch(SignInActions.SignIn_Request(user, history, enqueueSnackbar, t));
      setFieldValue("username", "");
      setFieldValue("password", "");
      setFieldValue("remember", false);
    }
  };
  const _handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const _handleMouseDownPassword = event => {
    event.preventDefault();
  };
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
  useEffect(() => {
    if (CheckAuthen()) {
      history.push("/");
    }
  });
  return (
    <SignIn
      handleBlur={handleBlur}
      errors={errors}
      touched={touched}
      enqueueSnackbar={enqueueSnackbar}
      i18n={i18n}
      setFieldTouched={setFieldTouched}
      t={t}
      _checkCurrentLanguage={_checkCurrentLanguage}
      _handleChangeLanguage={_handleChangeLanguage}
      _onHandleSubmit={_onHandleSubmit}
      _handleClickShowPassword={_handleClickShowPassword}
      _handleMouseDownPassword={_handleMouseDownPassword}
      showPassword={showPassword}
      handleChange={handleChange}
      values={values}
      history={history}
    />
  );
};

const SignInFormik = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: "",
    remember: false
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("UsernameRequired"),
    password: Yup.string().required("PasswordRequired")
  })
})(SignInPage);

export default withRouter(withSnackbar(SignInFormik));
