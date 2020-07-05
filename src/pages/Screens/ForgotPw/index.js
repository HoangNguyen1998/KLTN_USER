import React from "react";
import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {withFormik} from "formik";
import {withSnackbar} from "notistack";
import {Link} from "react-router-dom";
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
import {withStyles} from "@material-ui/core";
import * as Yup from "yup";

import * as SignInActions from "actions/SignIn";
import CheckAuthen from "helpers/GetToken";
import MenuLanguage from "pages/Components/MenuLanguage";
import {isEmpty} from "lodash";
import * as listApi from "helpers/ListApi";
import styles from "./styles";

const ForgotPw = (props) => {
    const {i18n, t} = useTranslation("translation");
    const [showMessage, setShowMessage] = useState(false);
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
        errors,
    } = props;
    const {email} = values;
    const [showPassword, setShowPassword] = useState(false);
    const _onHandleSubmit = async (event) => {
        event.preventDefault();
        // if (username !== "" && password !== "") {
        //     dispatch(
        //         SignInActions.SignIn_Request(user, history, enqueueSnackbar, t)
        //     );
        // }
        if (isEmpty(errors)) {
            try {
                const res = await listApi._postData("users/resetPassword", {
                    email: email,
                });
                console.log(res);
            } catch (err) {
                console.log(err.response);
            }
        }
    };
    const _handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const _handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (CheckAuthen()) {
            history.push("/");
        }
    }, [history]);
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <MenuLanguage />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t("Lay lai mat khau")}
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={(event) => _onHandleSubmit(event)}
                    >
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
                            onKeyUp={() =>
                                setFieldTouched("email", true, false)
                            }
                        />

                        {showMessage ? (
                            <div>
                                Ma dang nhap da gui den ban, vui long kiem tra
                                email
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {t("Gui toi ma dang nhap")}
                            </Button>
                        )}

                        <Grid container className={classes.container}>
                            <Grid item xs={12} className={classes.forgot}>
                                {/* <Button
                                    to="#"
                                    style={{fontSize: "1.2rem"}}
                                >
                                    {t("ForgotPassword")}
                                </Button> */}
                            </Grid>
                            <Grid item xs={12} className={classes.signup}>
                                <Button
                                    onClick={() => history.push("/signin")}
                                    className={classes.hover}
                                    style={{fontSize: "1.2rem"}}
                                >
                                    {t("BackToSignIn")}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

const ForgotPwFormik = withFormik({
    mapPropsToValues: () => ({
        email: "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email("InvalidEmail").required("EmailRequired"),
    }),
})(ForgotPw);

export default withRouter(withStyles(styles)(withSnackbar(ForgotPwFormik)));
