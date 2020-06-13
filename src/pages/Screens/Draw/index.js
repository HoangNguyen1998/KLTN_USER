import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import CanvasDraw from "react-canvas-draw";
import {withRouter} from "react-router-dom";
import {useSvgDrawing} from "react-hooks-svgdrawing";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";
import {Button} from "@material-ui/core";

const Draw = (props) => {
    const onSaveImage = () => {
        console.log("Luu anh", props);
        // localStorage.setItem("test", props.getSaveData())
    };
    const [renderRef, action] = useSvgDrawing({
        penWidth: 5, // pen width
        penColor: "#1890ff", // pen color
        width: 300, // drawing area width
        height: 300, // drawing area height
    });
    return (
        <div className="container">
            <div
                ref={renderRef}
                style={{
                    marginTop: "1rem",
                    width: "100%",
                    height: "80%",
                    border: "1px solid black",
                    margin: "auto",
                }}
            ></div>
            <div style={{marginTop: "1rem"}}>
                <Button onClick={action.clear}>Clear</Button>
                <Button onClick={action.download}>Dowload</Button>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(Draw));
