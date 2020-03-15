import React from "react";
import CoursesList from 'pages/Screens/CourseList'
import SignIn from "pages/Screens/SignIn";
import CheckAuthen from "helpers/GetToken";

const routes = [
  {
    path: "/courses",
    exact: false,
    main: () => (CheckAuthen() ? <CoursesList /> : <SignIn />)
  },
];

export default routes;
