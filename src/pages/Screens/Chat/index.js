import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import MessageIcon from "@material-ui/icons/Message";
import CloseIcon from "@material-ui/icons/Close";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import CircularProgress from '@material-ui/core/CircularProgress';
const list = [{name: "Hoang"}, {name: "Lam"}];

const ListFriends = () => {
    // state

    // useeffect

    // redux
    const friendsRedux = useSelector((state) => state.GetMe.user);

    // func
    const renderListFriends = (data) => {
        console.log(data);
        if(!data){
            return (<div className="loading-container"><CircularProgress/></div>)
        }
        if (data) {
            const {friends} = data;
            if (friends.length === 0) {
                // data.map((item, index) => {
                //     return <div>Helo</div>;
                // });
                return (
                    <div className="col1">
                        <div className="col1__item-container">
                            <div className="col1__item-container__info">
                                <div className="col1__item-container__info__image"></div>
                                <div>Hoang</div>
                            </div>
                            <div className="col1__item-container__action">
                                <Tooltip title="Tro chuyen">
                                    <IconButton
                                        color="primary"
                                        variant="outlined"
                                    >
                                        <MessageIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Huy ket ban">
                                    <IconButton
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col1__item-container">
                            <div className="col1__item-container__info">
                                <div className="col1__item-container__info__image"></div>
                                <div>Hoang</div>
                            </div>
                            <div className="col1__item-container__action">
                                <Tooltip title="Tro chuyen">
                                    <IconButton
                                        color="primary"
                                        variant="outlined"
                                    >
                                        <MessageIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Huy ket ban">
                                    <IconButton
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col1__item-container">
                            <div className="col1__item-container__info">
                                <div className="col1__item-container__info__image"></div>
                                <div>Hoang</div>
                            </div>
                            <div className="col1__item-container__action">
                                <Tooltip title="Tro chuyen">
                                    <IconButton
                                        color="primary"
                                        variant="outlined"
                                    >
                                        <MessageIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Huy ket ban">
                                    <IconButton
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col1__item-container">
                            <div className="col1__item-container__info">
                                <div className="col1__item-container__info__image"></div>
                                <div>Hoang</div>
                            </div>
                            <div className="col1__item-container__action">
                                <Tooltip title="Tro chuyen">
                                    <IconButton
                                        color="primary"
                                        variant="outlined"
                                    >
                                        <MessageIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Huy ket ban">
                                    <IconButton
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="col1__item-container">
                            <div className="col1__item-container__info">
                                <div className="col1__item-container__info__image"></div>
                                <div>Hoang</div>
                            </div>
                            <div className="col1__item-container__action">
                                <Tooltip title="Tro chuyen">
                                    <IconButton
                                        color="primary"
                                        variant="outlined"
                                    >
                                        <MessageIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Huy ket ban">
                                    <IconButton
                                        color="secondary"
                                        variant="outlined"
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="no-friend-container">
                        <SupervisedUserCircleIcon style={{fontSize: 25}}/>
                        Ban khong co nguoi ban nao
                    </div>
                );
            }
        }
    };
    return (
        <Grid item xs={12} lg={3}>
            <div className=" list-friend-header">Danh sach ban be</div>
            {/* {renderListFriends(friendsRedux)} */}
        </Grid>
    );
};

export default ListFriends;
