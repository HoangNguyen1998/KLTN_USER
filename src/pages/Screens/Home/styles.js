const drawerWidth = 200;

const styles = theme => ({
  root: {
    fontSize: "1.6rem !important",
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1"
  }
});

export default styles;
