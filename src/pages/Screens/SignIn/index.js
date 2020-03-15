import React from 'react'
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { withFormik } from "formik";
import { withSnackbar } from "notistack";
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
import * as Yup from "yup";

import * as SignInActions from "actions/SignIn";
import CheckAuthen from "helpers/GetToken";
import MenuLanguage from "pages/Components/MenuLanguage";
import styles from './styles'

const SignIn = (props) => {
    const { i18n, t } = useTranslation("translation");
    const dispatch = useDispatch();
    const {
        history,
        values,
        setFieldValue,
        handleChange,
        touched,
        classes,
        setFieldTouched,
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
    }, []);
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
    )
}

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
})(SignIn);

export default withRouter(withStyles(styles)(withSnackbar(SignInFormik)))
