import React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withFormik } from "formik";
import * as Yup from "yup";

import SignUp from "../components/SignUp";
import CheckAuthen from "../helpers/GetToken";
import * as SignUpActions from "../actions/SignUp";

const SignUpPage = props => {
  const { i18n, t } = useTranslation("translation");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    errors,
    history,
    setFieldTouched,
    touched,
    enqueueSnackbar,
    handleChange
  } = props;
  const { email, username, password } = values;
  const _onHandleSubmit = event => {
    event.preventDefault();
    const user = {
      email: email,
      username: username,
      password: password
    };
    if (email !== "" && username !== "" && password !== "") {
      dispatch(SignUpActions.SignUpRequest(user, history, t, enqueueSnackbar));
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
    <SignUp
      _handleClickShowPassword={_handleClickShowPassword}
      _handleMouseDownPassword={_handleMouseDownPassword}
      _onHandleSubmit={_onHandleSubmit}
      touched={touched}
      values={values}
      errors={errors}
      history={history}
      i18n={i18n}
      handleChange={handleChange}
      t={t}
      showPassword={showPassword}
      setFieldTouched={setFieldTouched}
      _handleChangeLanguage={_handleChangeLanguage}
      _checkCurrentLanguage={_checkCurrentLanguage}
    />
  );
};

const SignUpFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    username: "",
    password: "",
    retypepassword: "",
    userForWeb: true
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("InvalidEmail")
      .required("EmailRequired"),
    username: Yup.string()
      .min(5, "MinUsername")
      .required("UsernameRequired"),
    password: Yup.string()
      .min(8, "MinPassword")
      .required("PasswordRequired"),
    retypepassword: Yup.string()
      .required("ConfirmPassword")
      .oneOf([Yup.ref("password")], "MatchPassword")
  })
})(SignUpPage);
export default withRouter(withSnackbar(SignUpFormik));
