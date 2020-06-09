import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import CanvasDraw from "react-canvas-draw";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";
import { Button } from "@material-ui/core";

const Draw = (props) => {
    const onSaveImage=()=>{
        console.log("Luu anh", props)
        // localStorage.setItem("test", props.getSaveData())
    }
    return (
        <div>
            <CanvasDraw
                saveData={localStorage.getItem("test")}
                style={{
                    boxShadow:
                        "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
                }}
            />
            <Button onClick={()=>onSaveImage()}>Save</Button>
        </div>
    );
};

export default withRouter(withSnackbar(Draw));
