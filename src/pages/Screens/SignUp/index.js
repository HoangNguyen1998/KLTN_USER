import React from 'react'
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
import { withFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import CheckAuthen from "helpers/GetToken";
import * as SignUpActions from "actions/SignUp";
import MenuLanguage from "pages/Components/MenuLanguage";
import styles from './styles'

const SignUp = (props) => {
    const { i18n, t } = useTranslation("translation");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    errors,
    history,
    setFieldTouched,
    classes,
    touched,
    enqueueSnackbar,
    handleChange
  } = props;
  const { email, username, password, retypepassword } = values;
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
<Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <MenuLanguage />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("SignUp")}
          </Typography>
          <form className={classes.form} onSubmit={_onHandleSubmit}>
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              value={email}
              label={t("Email")}
              name="email"
              autoComplete="email"
              onChange={handleChange}
              error={errors.email && touched.email ? true : false}
              helperText={touched.email ? t(errors.email) : ""}
              onKeyUp={() => setFieldTouched("email", true, false)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("Username")}
              name="username"
              value={username}
              onChange={handleChange}
              autoComplete="username"
              error={errors.username && touched.username ? true : false}
              helperText={touched.username ? t(errors.username) : ""}
              onKeyUp={() => setFieldTouched("username", true, false)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              error={errors.password && touched.password ? true : false}
              helperText={touched.password ? `${t(errors.password)}` : ""}
              autoComplete="current-password"
              onChange={handleChange}
              onKeyUp={() => setFieldTouched("password", true, false)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={_handleClickShowPassword}
                    onMouseDown={_handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="retypepassword"
              label={t("RetypePassword")}
              type={showPassword ? "text" : "password"}
              value={retypepassword}
              id="retypepassword"
              error={
                errors.retypepassword && touched.retypepassword ? true : false
              }
              helperText={
                touched.retypepassword ? `${t(errors.retypepassword)}` : ""
              }
              autoComplete="current-password"
              onChange={handleChange}
              onKeyUp={() => setFieldTouched("retypepassword", true, false)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={_handleClickShowPassword}
                    onMouseDown={_handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("SignUp")}
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    )
}

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
  })(SignUp);
export default withRouter(withStyles(styles)(withSnackbar(SignUpFormik)));
