const drawerWidth = 200;

const styles = (theme) => ({
    root: {
        fontSize: "1.6rem !important",
        display: "flex",
        minHeight: "100vh",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: "#eaeff1",
    },
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: "rgba(255, 255, 255, 0.7)",
        "&:hover,&:focus": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
    },
    itemCategory: {
        backgroundColor: "#232f3e",
        boxShadow: "0 -1px 0 #404854 inset",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: "#4fc3f7",
    },
    itemPrimary: {
        fontSize: "inherit",
    },
    itemIcon: {
        minWidth: "auto",
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

export default styles;
