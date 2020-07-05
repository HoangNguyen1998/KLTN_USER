import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import {useTranslation} from "react-i18next";
import Rating from "@material-ui/lab/Rating";
import {withRouter} from "react-router-dom";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const ChallengeItem = (props) => {
    const {item, cau, onChangeChallenge, ChallengeDetail, history} = props;
    const {t} = useTranslation("translation");
    const checkPosition = (item, ChallengeDetail) => {
        if (ChallengeDetail._id === item._id) {
            return true;
        }
        return false;
    };
    return (
        <React.Fragment>
            <div className="col2__card">
                <Button
                    className={`col2__card__card-button ${
                        checkPosition(item, ChallengeDetail)
                            ? "col2__card__card-active"
                            : ""
                    }`}
                    onClick={() => history.push(`/challenges/${item._id}`)}
                >
                    {`${t("Question")} ${item.index}`}
                </Button>
                <Rating value={item.level} readOnly max={3} />
            </div>
        </React.Fragment>
    );
};

export default withRouter(ChallengeItem);
