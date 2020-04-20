import React from "react";
import CoursesList from "pages/Screens/CourseList";
import SignIn from "pages/Screens/SignIn";
import CheckAuthen from "helpers/GetToken";
import UserInformation from "pages/Screens/UserInformation";
import Challenges from "pages/Screens/Challenges";
import Topics from "pages/Screens/Topics";
import Friends from "pages/Screens/Friends";

const routes = [
    {
        path: "/friends",
        exact: false,
        main: () => (CheckAuthen() ? <Friends /> : <SignIn />),
    },
    {
        path: "/friends/:id",
        main: ()=>(CheckAuthen()?<Friends/>:<SignIn/>)
    },
    {
        path: "/topics",
        exact: false,
        main: () => (CheckAuthen() ? <Topics /> : <SignIn />),
    },
    {
        path: "/challenges",
        exact: false,
        main: () => (CheckAuthen() ? <Challenges /> : <SignIn />),
    },
    {
        path: "/courses",
        exact: false,
        main: () => (CheckAuthen() ? <CoursesList /> : <SignIn />),
    },
    {
        path: "/getme",
        exact: false,
        main: () => (CheckAuthen() ? <UserInformation /> : <SignIn />),
    },
];

export default routes;
