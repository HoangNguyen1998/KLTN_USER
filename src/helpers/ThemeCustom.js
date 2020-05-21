import {createMuiTheme} from "@material-ui/core/styles";

let theme = createMuiTheme({
    palette: {
        primary: {
            light: "#63ccff",
            main: "#009be5",
            dark: "#006db3"
        }
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5
        }
    },
    shape: {
        borderRadius: 8
    },
    props: {
        MuiTab: {
            disableRipple: true
        }
    },
    mixins: {
        toolbar: {
            minHeight: 50
        }
    }
});

theme = {
    ...theme,
    overrides: {
        MuiInputBase: {
            root: {
                fontSize: "1.6rem"
            }
        },
        MuiSnackbarContent: {
            root: {
                fontSize: "1.6rem !important"
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: "#ffffff"
            }
        },
        MuiTypography: {
            body1: {
                fontSize: "1.6rem"
            }
        },
        MuiFormLabel: {root: {fontSize: "1.6rem"}},
        MuiButton: {
            label: {
                textTransform: "none",
                fontSize: "1.6rem"
            },
            contained: {
                boxShadow: "none",
                "&:active": {
                    boxShadow: "none"
                }
            }
        },
        MuiTabs: {
            root: {
                marginLeft: theme.spacing(1)
            },
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                backgroundColor: theme.palette.common.white
            }
        },
        MuiTab: {
            root: {
                textTransform: "none",
                margin: "0 16px",
                minWidth: 0,
                padding: 0,
                [theme.breakpoints.up("md")]: {
                    padding: 0,
                    minWidth: 0
                }
            }
        },
        MuiIconButton: {
            root: {
                padding: theme.spacing(1)
            }
        },
        MuiTooltip: {
            tooltip: {
                borderRadius: 4,
                fontSize: 14
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: "#404854"
            }
        },
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium
            }
        },
        MuiListItemIcon: {
            root: {
                color: "inherit",
                marginRight: 0,
                "& svg": {
                    fontSize: 20
                }
            }
        },
        MuiAvatar: {
            root: {
                width: 32,
                height: 32
            }
        }
    }
};

export default theme;
