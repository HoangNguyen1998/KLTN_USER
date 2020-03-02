import SignUpSaga from "./SignUpSaga";
import SignInSaga from "./SignInSaga";
// import getmeSaga from "./GetMeSaga";
// import homeSaga from "./HomeSaga";
// import coursesSaga from "./CoursesSaga";
// import challengesSaga from "./ChallengesSaga";
// import topicsSaga from "./TopicsSaga";
import { all } from "redux-saga/effects";
function* rootSaga() {
  yield all([
    SignUpSaga(),
    SignInSaga()
    // getmeSaga(),
    // homeSaga(),
    // coursesSaga(),
    // topicsSaga(),
    // challengesSaga()
  ]);
}
export default rootSaga;
