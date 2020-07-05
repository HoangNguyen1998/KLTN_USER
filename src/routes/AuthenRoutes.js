import React from "react";
import SignIn from "pages/Screens/SignIn";
import SignUp from "pages/Screens/SignUp";
import ForgotPw from "pages/Screens/ForgotPw";

const routes = [
    {
        path: "/forgot-pw",
        exact: false,
        main: () => <ForgotPw />,
    },
    {
        path: "/signin",
        exact: false,
        main: () => <SignIn />,
    },
    {
        path: "/signup",
        exact: false,
        main: () => <SignUp />,
    },
];

export default routes;
