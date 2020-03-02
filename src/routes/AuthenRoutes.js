import React from "react";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const routes = [
  {
    path: "/signin",
    exact: false,
    main: () => <SignInPage />
  },
  {
    path: "/signup",
    exact: false,
    main: () => <SignUpPage />
  }
];

export default routes;
