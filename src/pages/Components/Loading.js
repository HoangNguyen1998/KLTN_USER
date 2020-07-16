import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const Loading = props => {
    const { index} = props;
    return (
        <Grid style={{width: "100%", margin: 0}} container spacing={3}>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12} lg={4} key={index}>
                <div className="paper-container">
                    <Card>
                        <CardActionArea>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height="200px"
                            />
                            <Skeleton animation="wave" height={50} />
                        </CardActionArea>
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            height="50px"
                        />
                    </Card>
                </div>
            </Grid>
        </Grid>
    );
};
export default Loading;
