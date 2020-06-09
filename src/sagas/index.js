import SignUpSaga from "./SignUpSaga";
import SignInSaga from "./SignInSaga";
import GetMeSaga from "./GetMeSaga";
// import homeSaga from "./HomeSaga";
import CoursesSaga from "./CoursesSaga";
import ChallengesSaga from "./ChallengesSaga";
import TopicsSaga from "./TopicsSaga";
import FriendsSaga from './FriendsSaga'
import VideoSaga from './VideoSaga'
import AlphabetSaga from './AlphabetSaga'
import MessagesSaga from './MessagesSaga'
import { all } from "redux-saga/effects";
import TimerSaga from './TimerSaga'
function* rootSaga() {
  yield all([
    SignUpSaga(),
    SignInSaga(),
    CoursesSaga(),
    GetMeSaga(),
    TopicsSaga(),
    ChallengesSaga(),
    FriendsSaga(),
    AlphabetSaga(),
    VideoSaga(),
    MessagesSaga(),
    TimerSaga()
  ]);
}
export default rootSaga;
