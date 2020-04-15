import React from "react";
import CoursesList from 'pages/Screens/CourseList'
import SignIn from "pages/Screens/SignIn";
import CheckAuthen from "helpers/GetToken";
import UserInformation from 'pages/Screens/UserInformation'
import Challenges from 'pages/Screens/Challenges'

const routes = [
  {
    path: "/challenges",
    exact: false,
    main: () => (CheckAuthen() ? <Challenges /> : <SignIn />)
  },
  {
    path: "/courses",
    exact: false,
    main: () => (CheckAuthen() ? <CoursesList /> : <SignIn />)
  },
  {
    path: "/getme",
    exact: false,
    main: ()=>(CheckAuthen()?<UserInformation/>:<SignIn/>)
  }
];

export default routes;
