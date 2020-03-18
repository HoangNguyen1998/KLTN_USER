import SignUpSaga from "./SignUpSaga";
import SignInSaga from "./SignInSaga";
import GetMeSaga from "./GetMeSaga";
// import homeSaga from "./HomeSaga";
import CoursesSaga from "./CoursesSaga";
// import challengesSaga from "./ChallengesSaga";
// import topicsSaga from "./TopicsSaga";
import { all } from "redux-saga/effects";
function* rootSaga() {
  yield all([
    SignUpSaga(),
    SignInSaga(),
    CoursesSaga(),
    GetMeSaga(),
    // homeSaga(),
    // coursesSaga(),
    // topicsSaga(),
    // challengesSaga()
  ]);
}
export default rootSaga;
