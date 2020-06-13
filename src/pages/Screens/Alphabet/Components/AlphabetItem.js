import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const AlphabetItem = (props) => {
    const {item, valueTab, changeWord} = props;
    const alphabetDetail = useSelector(
        (state) => state.Alphabet.alphabetDetail
    );
    const checkPosition = (item, alphabetDetail) => {
        if (alphabetDetail._id === item._id) {
            return true;
        }
        return false;
    };
    const renderWord = (item) => {
        if (parseInt(valueTab) === 1) {
            return item.hira;
        }
        if (parseInt(valueTab) === 2) {
            return item.kata;
        }
    };
    return (
        <React.Fragment>
            <Grid item xs={6} lg={2}>
                <Paper
                    onClick={() => {
                        changeWord(item._id);
                    }}
                    className={`${
                        checkPosition(item, alphabetDetail) ? "item-active" : ""
                    } alphabet-item-container font-custom16`}
                >
                    <div>{renderWord(item)}</div>
                    <div>{item.romaji}</div>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default withRouter(AlphabetItem);
