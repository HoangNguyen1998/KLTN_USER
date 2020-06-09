import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import {useTranslation} from "react-i18next";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import "../styles.scss";
import * as CoursesActions from "actions/Courses";

const Course = props => {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const {item, index, onShowCourse, history} = props;
    const dispatch = useDispatch();
    const {i18n, t} = useTranslation("translation");
    const coursesRedux = useSelector(state => state);
    const circularRedux = useSelector(state => state.Loading.showCircular);
    const {isLoading} = coursesRedux;
    const onShowModal = type => () => {
        history.push('/courses/learn')
        console.log("Tai bai hoc")
        dispatch(CoursesActions.Get_Course_Request(item._id));
        onShowCourse(type);
    };
    const onDeleteCourse = () => {
        dispatch(
            CoursesActions.Delete_Course_Request(item._id, setShowModalDelete)
        );
        // setShowModalDelete(false);
    };
    const onShowModalDelete = () => {
        setShowModalDelete(true);
    };
    const onHideModalDelete = () => {
        setShowModalDelete(false);
    };
    const onLearn=(id)=>()=>{
        dispatch(CoursesActions.Get_Course_Request(id));
        history.push(`/courses/${id}/learn`)
    }
    const onRememberCard=(id)=>()=>{
        dispatch(CoursesActions.Get_Course_Request(id));
        history.push(`/courses/${id}/flash-card`)
    }
    return (
        <Grid item xs={12} lg={4} key={index}>
            <div className="paper-container" onClick={onShowModal}>
                <Card>
                    <CardActionArea>
                        {isLoading ? (
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                        ) : (
                            <CardMedia
                                style={{
                                    height: "200px",
                                    backgroundRepeat: "cover"
                                }}
                                image={`https://picsum.photos/500/200?x=${item._id}`}
                                title="Contemplative Reptile"
                            />
                        )}
                        {isLoading ? (
                            <Skeleton animation="wave" height={50} />
                        ) : (
                            <CardContent>
                                <h1 className="general-color">{item.title}</h1>
                            </CardContent>
                        )}
                    </CardActionArea>
                    {isLoading ? (
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    ) : (
                        <CardActions>
                            <Button
                                // onClick={onShowModal(0)}
                                onClick={onRememberCard(item._id)}
                                size="small"
                                variant="contained"
                                color="primary"
                                style={{color: "white !important"}}
                            >
                                {t("RememberCard")}
                            </Button>
                            <Button
                                onClick={onLearn(item._id)}
                                className="general-color"
                                size="small"
                                variant="outlined"
                            >
                                {t("Learn")}
                            </Button>
                            <div style={{marginLeft: "auto"}}>
                                <Button
                                    onClick={onShowModalDelete}
                                    size="small"
                                >
                                    {t("Delete")}
                                </Button>
                            </div>
                        </CardActions>
                    )}
                </Card>
            </div>
            <Dialog
                open={showModalDelete}
                keepMounted
                fullWidth={true}
                maxWidth="sm"
                onClose={onHideModalDelete}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText
                        className="global-black"
                        id="alert-dialog-slide-description"
                    >
                        {t("AreYouSure")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={circularRedux} onClick={onHideModalDelete}>{t("Cancel")}</Button>
                    <Button onClick={onDeleteCourse} color="primary">
                        {circularRedux ? (
                            <CircularProgress size={25} />
                        ) : (
                            t("OK")
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default withRouter(Course);
