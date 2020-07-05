import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {
    CircularProgress,
    Paper,
    Card,
    CardContent,
    CardMedia,
    Grid,
    CardActionArea,
    Typography,
    Collapse,
    Button,
    CardActions,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./styles.scss";
const dummyNews = [
    {
        _id: 1,
        title: "Tao moi challenge",
        content: "Quan tri vien vua tao moi mot thu thach",
        image: null,
    },
    {
        _id: 2,
        title: "Cap nhat chu de tu vung",
        content: "Quan tri vien vua cap nhat chu de tu vung x",
        image: null,
    },
    {
        _id: 3,
        title: "Cap nhat bang chu cai",
        content: "Quan tri vien vua cap nhat chu cai",
        image: null,
    },
];
const HomePage = (props) => {
    // DEFINE
    const {i18n, t} = useTranslation("translation");
    // STATE
    const [expanded, setExpanded] = React.useState(null);
    const [isLoading, setisLoading] = useState(false);
    // USEEFFECT

    // FUNC
    const handleExpandClick = (type) => {
        if (type === "hide") {
            setExpanded(null);
        } else {
            setExpanded(type);
        }
    };
    const _renderNews = (data) => {
        if (data.length !== 0) {
            return data.map((item, index) => {
                return (
                    <Grid item lg={6}>
                        <Card
                            onClick={() => console.log("Hellllooo")}
                            className="new-container"
                            style={{
                                minHeight: "30rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardActionArea>
                                {isLoading ? (
                                    <Skeleton
                                        animation="wave"
                                        variant="rect"
                                        height="200px"
                                    />
                                ) : (
                                    <CardMedia
                                        style={{
                                            height: "300px",
                                            backgroundRepeat: "cover",
                                        }}
                                        image={`https://picsum.photos/500/200?x=${item._id}`}
                                        title="Contemplative Reptile"
                                    />
                                )}
                                {isLoading ? (
                                    <Skeleton animation="wave" />
                                ) : (
                                    <CardContent>
                                        <h2
                                            style={{wordBreak: "break-word"}}
                                            className="general-color h2-title-course"
                                        >
                                            {item.title}
                                        </h2>
                                        <div>{item.content}</div>
                                    </CardContent>
                                )}
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <Button
                                    onClick={() => {
                                        expanded !== null
                                            ? handleExpandClick("hide")
                                            : handleExpandClick(item._id);
                                    }}
                                >
                                    {expanded === item._id ? "Hide" : "Show more"}
                                </Button>
                            </CardActions>
                            <Collapse
                                in={expanded === item._id ? true : false}
                                timeout="auto"
                                unmountOnExit
                            >
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until
                                        simmering, add saffron and set aside for
                                        10 minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella
                                        pan or a large, deep skillet over
                                        medium-high heat. Add chicken, shrimp
                                        and chorizo, and cook, stirring
                                        occasionally until lightly browned, 6 to
                                        8 minutes. Transfer shrimp to a large
                                        plate and set aside, leaving chicken and
                                        chorizo in the pan. Add pimentón, bay
                                        leaves, garlic, tomatoes, onion, salt
                                        and pepper, and cook, stirring often
                                        until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining
                                        4 1/2 cups chicken broth; bring to a
                                        boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to
                                        distribute. Top with artichokes and
                                        peppers, and cook without stirring,
                                        until most of the liquid is absorbed, 15
                                        to 18 minutes. Reduce heat to
                                        medium-low, add reserved shrimp and
                                        mussels, tucking them down into the
                                        rice, and cook again without stirring,
                                        until mussels have opened and rice is
                                        just tender, 5 to 7 minutes more.
                                        (Discard any mussels that don’t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest
                                        for 10 minutes, and then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                );
            });
        }
    };

    // RENDER
    return (
        <div className="home-page-container">
            <Grid container spacing={5}>
                {_renderNews(dummyNews)}
            </Grid>
        </div>
    );
};

export default withRouter(withSnackbar(HomePage));
