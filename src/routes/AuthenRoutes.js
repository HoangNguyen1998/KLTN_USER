import React from "react";
import SignIn from "pages/Screens/SignIn";
import SignUp from "pages/Screens/SignUp";

const routes = [
  {
    path: "/signin",
    exact: false,
    main: () => <SignIn />
  },
  {
    path: "/signup",
    exact: false,
    main: () => <SignUp />
  }
];

export default routes;
