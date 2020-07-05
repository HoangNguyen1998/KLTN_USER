import loginBackground from "assets/loginbackground.jpg";
const stylesSignIn = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#0582bd"
    }
  },
  forgot: {
    flexGrow: "unset",
    flexBasis: "auto !important",
  },
  email: {
    "&:hover": {
      borderColor: "red"
    }
  },
  signup: {
    flexBasis: "auto",
    flexGrow: "unset"
  },
  container: {
    justifyContent: "space-between"
  },
  remember: {
    color: theme.palette.primary.main
  },
  hover: {
    "&:hover": {
      cursor: "pointer"
    }
  }

  // Menu Of Language
});

export default stylesSignIn;
