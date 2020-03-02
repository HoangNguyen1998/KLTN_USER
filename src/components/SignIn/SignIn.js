import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LanguageIcon from "@material-ui/icons/Language";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core";
import stylesSignIn from "./Styles";

import MenuLanguage from "../MenuLanguage";

const SignIn = props => {
  const {
    classes,
    _checkCurrentLanguage,
    _onHandleSubmit,
    _handleClickShowPassword,
    _handleMouseDownPassword,
    showPassword,
    handleChange,
    _handleChangeLanguage,
    i18n,
    t,
    values,
    setFieldTouched,
    enqueueSnackbar,
    touched,
    errors,
    handleBlur
  } = props;
  const { username, password, remember } = values;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <MenuLanguage
          t={t}
          i18n={i18n}
          _handleChangeLanguage={_handleChangeLanguage}
          _checkCurrentLanguage={_checkCurrentLanguage}
        />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("SignIn")}
          </Typography>
          <form
            className={classes.form}
            onSubmit={event => _onHandleSubmit(event)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={username}
              id="username"
              label={t("Username")}
              name="username"
              autoComplete="username"
              error={touched.username && errors.username ? true : false}
              helperText={touched.username ? t(errors.username) : ""}
              // error={testError}
              //autoFocus
              onChange={handleChange}
              onKeyUp={() => setFieldTouched("username", true, false)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              name="password"
              label={t("Password")}
              type={showPassword ? "text" : "password"}
              id="password"
              error={touched.password && errors.password ? true : false}
              autoComplete="current-password"
              helperText={touched.password ? t(errors.password) : ""}
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
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  value={remember}
                  checked={remember}
                  className={classes.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={t("Remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("SignIn")}
            </Button>
            <Grid container className={classes.container}>
              <Grid item xs className={classes.forgot}>
                <Link to="#" variant="body2">
                  {t("ForgotPassword")}
                </Link>
              </Grid>
              <Grid item xs className={classes.signup}>
                <Link to="/signup" variant="body2" className={classes.hover}>
                  {t("DontHaveAcc")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(stylesSignIn)(SignIn);
