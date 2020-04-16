import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {useTranslation} from "react-i18next";

const ListComment = () => {
    const {t} = useTranslation("translation");
    const commentRedux = useSelector((state) => state.Challenges.listComment);
    //func
    const renderComment = (commentRedux) => {
        console.log(commentRedux);
        if (commentRedux.length !== 0) {
            return commentRedux.map((item, index) => {
                return (
                    <TextField
                        label={item.userName}
                        value={item.content}
                        inputProps={{readOnly: true}}
                        helperText={item.createdAt}
                    />
                );
            });
        }
    };
    return (
        <div className="list-comment-container">
            <div>{t("ListComment")}</div>
            {renderComment(commentRedux)}
        </div>
    );
};

export default ListComment;
