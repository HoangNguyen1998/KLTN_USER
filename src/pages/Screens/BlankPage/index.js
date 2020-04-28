import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import './styles.scss'

const BlankPage = (props) => {
    return (
        <div>
            
        </div>
    )
}

export default withRouter(withSnackbar(BlankPage));
