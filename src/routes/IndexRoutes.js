import React from "react";
import CoursesList from "pages/Screens/CourseList";
import SignIn from "pages/Screens/SignIn";
import CheckAuthen from "helpers/GetToken";
import UserInformation from "pages/Screens/UserInformation";
import Challenges from "pages/Screens/Challenges";
import Topics from "pages/Screens/Topics";
import Friends from "pages/Screens/Friends";
import Alphabet from "pages/Screens/Alphabet";
import Video from "pages/Screens/Video";
import Messages from "pages/Screens/Message";
import VideoDetail from "pages/Screens/VideoDetail";
import TopicDetail from "pages/Screens/Topics/Components/TopicDetail";
import CreateCourse from "pages/Screens/CreateCourse";
import LearnCourse from "pages/Screens/CourseList/Components/LearnCourse";
import FlashCard from "pages/Screens/CourseList/Components/FlashCard";
import WriteCourse from "pages/Screens/CourseList/Components/WriteCourse";
import ListenCourse from "pages/Screens/CourseList/Components/ListenCourse";
import Draw from "pages/Screens/Draw";

const categories = [
    {
        id: "FlashCard",
        name: "flash-card",
        render: <FlashCard />,
    },
    {
        id: "Learn",
        name: "learn",
        render: <FlashCard />,
    },
    {
        id: "Write",
        name: "write",
        render: <WriteCourse />,
    },
    {
        id: "Listen",
        name: "listen",
        render: <FlashCard />,
    },
    {
        id: "Test",
        name: "test",
        render: <FlashCard />,
    },
];

// const renderCoursePath = () => {
//     console.log("Hello")
//     categories.forEach((item)=>{
//         if(item.name==)
//     })
// };

const routes = [
    {
        path: "/draw",
        exact: false,
        main: () => (CheckAuthen() ? <Draw /> : <SignIn />),
    },
    {
        path: "/courses/:id/listen",
        exact: false,
        main: () => (CheckAuthen() ? <ListenCourse /> : <SignIn />),
    },
    {
        path: "/courses/:id/write",
        exact: false,
        main: () => (CheckAuthen() ? <WriteCourse /> : <SignIn />),
    },
    {
        path: "/courses/:id/learn",
        exact: false,
        main: () => (CheckAuthen() ? <LearnCourse /> : <SignIn />),
    },
    {
        path: "/courses/:id/flash-card",
        exact: true,
        main: () => (CheckAuthen() ? <FlashCard /> : <SignIn />),
    },
    {
        path: "/courses/:id/:type",
        exact: false,
        main: () => (CheckAuthen() ? <LearnCourse /> : <SignIn />),
    },
    {
        path: "/courses/create",
        exact: false,
        main: () => (CheckAuthen() ? <CreateCourse /> : <SignIn />),
    },
    {
        path: "/video/:id",
        exact: false,
        main: () => (CheckAuthen() ? <VideoDetail /> : <SignIn />),
    },
    {
        path: "/video",
        exact: false,
        main: () => (CheckAuthen() ? <Video /> : <SignIn />),
    },
    {
        path: "/alphabet/:id",
        exact: false,
        main: () => (CheckAuthen() ? <Alphabet /> : <SignIn />),
    },
    {
        path: "/friends",
        exact: false,
        main: () => (CheckAuthen() ? <Friends /> : <SignIn />),
    },
    {
        path: "/friends/:id",
        main: () => (CheckAuthen() ? <Friends /> : <SignIn />),
    },
    {
        path: "/topics/:id",
        exact: false,
        main: () => (CheckAuthen() ? <TopicDetail /> : <SignIn />),
    },
    {
        path: "/topics",
        exact: false,
        main: () => (CheckAuthen() ? <Topics /> : <SignIn />),
    },
    {
        path: "/messages/:id",
        exact: false,
        main: () => (CheckAuthen() ? <Messages /> : <SignIn />),
    },
    {
        path: "/messages",
        exact: false,
        main: () => (CheckAuthen() ? <Messages /> : <SignIn />),
    },
    {
        path: "/challenges/:id",
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
