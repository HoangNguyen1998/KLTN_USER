import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {TextField, Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import SpeechRecognition from "react-speech-recognition";
import "./styles.scss";

const EnglishKeyboard = [
    {
        line: 1,
        content: [
            "`",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "-",
            "=",
        ],
    },
    {
        line: 2,
        content: [
            "",
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "[",
            "]",
            "``",
        ],
    },
    {
        line: 3,
        content: [
            "",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            ";",
            "'",
            "",
        ],
    },
    {
        line: 4,
        content: [
            "",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            ",",
            ".",
            "/",
            "",
            "",
            "",
        ],
    },
    {
        line: 5,
        content: [""],
    },
];

const Hiragana = [
    {
        line: 1,
        content: [
            "ろ",
            "ぬ",
            "ふ",
            "あ",
            "う",
            "え",
            "お",
            "や",
            "ゆ",
            "よ",
            "わ",
            "ほ",
            "へ",
            "Backspace",
        ],
    },
    {
        line: 2,
        content: [
            "Tab",
            "た",
            "て",
            "い",
            "す",
            "か",
            "ん",
            "な",
            "に",
            "ら",
            "せ",
            "゛",
            "゜",
            "む",
        ],
    },

    {
        line: 3,
        content: [
            "Caps lock",
            "ち",
            "と",
            "し",
            "は",
            "き",
            "く",
            "ま",
            "の",
            "り",
            "れ",
            "け",
            "Enter",
        ],
    },

    {
        line: 4,
        content: [
            "Shift",
            "つ",
            "さ",
            "そ",
            "ひ",
            "こ",
            "み",
            "も",
            "ね",
            "る",
            "め",
            "Shift",
        ],
    },
    {
        line: 5,
        content: ["Space"],
    },
];

const Katakana = [
    {
        line: 1,
        content: [
            "ロ",
            "ヌ",
            "フ",
            "ア",
            "ウ",
            "エ",
            "オ",
            "ヤ",
            "ユ",
            "ヨ",
            "ワ",
            "ホ",
            "ヘ",
            "Backspace",
        ],
    },
    {
        line: 2,
        content: [
            "Tab",
            "タ",
            "テ",
            "イ",
            "ス",
            "カ",
            "ン",
            "ナ",
            "ニ",
            "ラ",
            "セ",
            "゛",
            "゜",
            "ム",
        ],
    },

    {
        line: 3,
        content: [
            "Caps lock",
            "チ",
            "ト",
            "シ",
            "ハ",
            "キ",
            "ク",
            "マ",
            "ノ",
            "リ",
            "レ",
            "ケ",
            "Enter",
        ],
    },

    {
        line: 4,
        content: [
            "Shift",
            "ツ",
            "サ",
            "ソ",
            "ヒ",
            "コ",
            "ミ",
            "モ",
            "ネ",
            "ル",
            "メ",
            "Shift",
        ],
    },
    {
        line: 5,
        content: ["Space"],
    },
];
// const recognition = new SpeechRecognition()

// recognition.continous = true
// recognition.interimResults = true
// recognition.lang = 'ja-JP'
const options = {
    autoStart: false,
  }

const Keyboard = (props) => {
    // DEFINE
    const { recognition, transcript, resetTranscript, startListening, stopListening} = props;
    // STATE
    const [changeKeyboard, setChangeKeyboard] = useState(false);
    const [valueInput, setValueInput] = useState([]);
    const _listenKeyboard = (e) => {
        console.log(e.target.value);
    };
    useEffect(()=>{
        recognition.lang="ja-JP"
    })
    const _listenVirtualKeyboard = (value) => {
        if (value === "Backspace") {
            console.log("vao phim backpace");
            const custom = [...valueInput];
            custom.splice(custom.length - 1, 1);
            setValueInput(custom);
        } else {
            setValueInput((state) => [...state, value]);
        }
        console.log(valueInput.join(""));
    };
    const _check = () => {
        if (valueInput.join("") === "ろぬふあう") {
            console.log("success");
        }
    };
    const renderHiraKeyboard = () => {
        return Hiragana.map((line, parent) => {
            return (
                <div className={`line-container-${parent}`}>
                    {line.content.map((item, child) => {
                        return (
                            <div
                                onClick={() => _listenVirtualKeyboard(item)}
                                className={`line-container-${parent}__item-normal`}
                            >
                                <div>
                                    {EnglishKeyboard[parent].content[child]}
                                </div>
                                <div
                                    className={`line-container-${parent}__item-normal__middle`}
                                >
                                    {item}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };
    const _startListening = () =>{
        startListening()
        resetTranscript()
    }
    const renderKataKeyboard = () => {
        return Katakana.map((line, parent) => {
            return (
                <div className={`line-container-${parent}`}>
                    {line.content.map((item, child) => {
                        return (
                            <div
                                onClick={() => _listenVirtualKeyboard(item)}
                                className={`line-container-${parent}__item-normal`}
                            >
                                <div>
                                    {EnglishKeyboard[parent].content[child]}
                                </div>
                                <div
                                    className={`line-container-${parent}__item-normal__middle`}
                                >
                                    {item}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };
    return (
        <div className="container">
            <div className="show-input-result">{valueInput}</div>
            {changeKeyboard ? renderKataKeyboard() : renderHiraKeyboard()}
            <Button onClick={() => setChangeKeyboard(!changeKeyboard)}>
                {changeKeyboard ? "Katakana" : "Hiragana"}
            </Button>
            <div>
            <button onClick={()=>{_startListening()}}>Start</button>
            <button onClick={()=>stopListening()}>Start</button>
                <button onClick={resetTranscript}>Reset</button>
                <span>{transcript}</span>
            </div>
        </div>
    );
};

export default withRouter(withSnackbar(SpeechRecognition(options)(Keyboard)));
