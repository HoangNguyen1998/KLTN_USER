import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import CanvasDraw from "react-canvas-draw";
import {withRouter} from "react-router-dom";
import {useSvgDrawing} from "react-hooks-svgdrawing";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./styles.scss";

import layout from "simple-keyboard-layouts/build/layouts/japanese";


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

    const [input, setInput] = useState("");
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    const onChange = (input) => {
        setInput(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button) => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const onChangeInput = (event) => {
        const input = event.target.value;
        setInput(input);
        keyboard.current.setInput(input);
    };
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
