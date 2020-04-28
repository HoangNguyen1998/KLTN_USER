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
import { all } from "redux-saga/effects";
function* rootSaga() {
  yield all([
    SignUpSaga(),
    SignInSaga(),
    CoursesSaga(),
    GetMeSaga(),
    // homeSaga(),
    // coursesSaga(),
    TopicsSaga(),
    ChallengesSaga(),
    FriendsSaga(),
    AlphabetSaga(),
    VideoSaga()
  ]);
}
export default rootSaga;
