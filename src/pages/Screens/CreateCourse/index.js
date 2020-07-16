import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {
    Box,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Paper,
    IconButton,
    Card,
    Button,
    CircularProgress,
    TextField,
    Tooltip,
} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";

import * as CoursesActions from "actions/Courses";

const CreateCourse = (props) => {
    const {history, enqueueSnackbar}=props
    const {i18n, t} = useTranslation("translation");
    const circularRedux = useSelector((state) => state.Loading.showCircular);
    const [array, setArray] = useState({
        title: "",
        content: [
            {text: "", mean: ""},
            {text: "", mean: ""},
        ],
    });
    const AddCourseValue = useSelector((state) => {
        return state.Courses.course;
    });
    const dispatch = useDispatch();
    const onAddNewCard = () => {
        const item = {text: "", mean: ""};
        const data = [...array.content];
        data.push(item);
        setArray({...array, content: data});
    };
    const handleChange = (event) => {
        var value = event.target.value;
        setArray({...array, title: value});
    };
    const onDeleteCard = (index) => {
        const data = [...array.content];
        data.splice(index, 1);
        setArray({...array, content: data});
    };
    const onChange = (event, index) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        const data = [...array.content];
        if (name === "text") {
            data[index].text = value;
        }
        if (name === "mean") {
            data[index].mean = value;
        }
        setArray({...array, content: data});
    };
    const onHandleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            CoursesActions.Add_Course_Request(
                array,
                history,
                enqueueSnackbar,
                t,
            )
        );
    };
    const renderCard = (data) => {
        let xhtml = null;
        xhtml = data.map((item, index) => {
            return (
                <Card key={index} style={{marginBottom: "4%"}}>
                    <CardHeader
                        title={index + 1}
                        action={
                            <Tooltip title={t("DeleteCard")}>
                                <IconButton onClick={() => onDeleteCard(index)}>
                                    <DeleteIcon style={{fontSize: 25}} />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={5} style={{padding: 0}}>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        value={item.text}
                                        name="text"
                                        required
                                        style={{margin: "1%"}}
                                        fullWidth
                                        id="standard-textarea"
                                        label={t("NewWord")}
                                        placeholder="Enter your new word at here"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                        // onKeyDown={e => this.props.onPress(e, index)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box m={3}>
                                    <TextField
                                        name="mean"
                                        value={item.mean}
                                        required
                                        style={{margin: "1%"}}
                                        fullWidth
                                        id="standard-textarea"
                                        label={t("MeanWord")}
                                        placeholder="Enter mean of word you just entered"
                                        multiline
                                        margin="normal"
                                        onChange={(e) => onChange(e, index)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
        });
        return xhtml;
    };
    return (
        <React.Fragment>
            <div className="add-course-container">
                <form onSubmit={onHandleSubmit}>
                    <Box ml={8}>
                        <TextField
                            required
                            id="standard-multiline-flexible"
                            name="CourseName"
                            label="Ten khoa hoc"
                            value={array.title}
                            onChange={handleChange}
                            rowsMax="4"
                            className="add-course-container__text-field"
                            margin="normal"
                        />
                    </Box>
                    <Box m={8}>
                        {renderCard(array.content)}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onAddNewCard}
                            disabled={circularRedux}
                        >
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    {t("CreateNewCard")}
                                </Grid>
                            </Grid>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="add-course-container__button"
                            type="submit"
                        >
                            {circularRedux ? (
                                <CircularProgress color="#ffffff" size={25} />
                            ) : (
                                t("Create")
                            )}
                        </Button>
                    </Box>
                </form>
            </div>
        </React.Fragment>
    );
};

export default withRouter(withSnackbar(CreateCourse));

