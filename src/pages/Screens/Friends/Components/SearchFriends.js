import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as FriendsActions from "actions/Friends";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import CallApi from "helpers/ApiCaller";

const SearchFriends = () => {
    const dispatch = useDispatch();
    const [listNotFriend, setListNotFriend] = useState([]);
    useEffect(() => {
        getListNotFriend();
    }, []);
    const usersRedux = useSelector((state) => state.Friends.listUsers);

    //func
    const getListNotFriend = async () => {
        const res = await CallApi("users/notFriend", "GET", null);
        console.log(res);
        setListNotFriend(res.data);
    };
    const renderListUsers = (data) => {
        console.log(data);
        if (data) {
            if (data.length !== 0) {
                return data.map((item, index) => {
                    return <div>Helo</div>;
                });
            } else {
                return <div>Ban khong co nguoi ban nao</div>;
            }
        }
    };
    return (
        <Grid item xs={12} lg={6}>
            <div className="col2">
                <div className="col2__search-friend-header">
                    Tim kiem ban be
                </div>
                <div className="col2__search-container">
                    <TextField
                        fullWidth
                        placeholder="Search friend"
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                </div>
            </div>
        </Grid>
    );
};

export default SearchFriends;
