import { call, put, takeLatest, take, fork } from "redux-saga/effects";
import * as ChallengesConstants from "../constants/Challenges";
import * as ChallengesActions from "../actions/Challenges";
import CallApi from "helpers/ApiCaller";

//Lay danh sach tat ca khoa hoc cua nguoi dung
function* getChallengesRequest() {
  while (true) {
    try {
      const action = yield take(ChallengesConstants.GET_ALL_CHALLENGES_REQUEST);
      const res = yield call(CallApi, "challenges", "GET", null);
      const { data } = res;
      yield put(ChallengesActions.Get_All_Challenges_Success(data));
      action.payload(false)
    } catch (err) {}
  }
}


//Lay chi tiet mot khoa hoc duoc chi dinh
function* getChallengeDetailsRequest(data) {
  console.log("trong saga chi tiet khoa hoc: ", data);
  const { payload } = data;
  try {
    const res = yield call(CallApi, `challenges/${payload.id}`, "GET", null);
    const resComments = yield call(CallApi, `comments/challenge/${payload.id}`, "GET", null)
    const { data } = res;
    yield put(ChallengesActions.Get_Challenge_Details_Success(data));
    yield put(ChallengesActions.Get_Comments(resComments.data.result))
    payload.setIsWaiting(false)
  } catch (err) {
    yield put(ChallengesActions.Get_Challenge_Details_Error(err));
  }
}

//   //Hoc mot khoa hoc duoc chon
//   function* learncourseRequest(course) {
//     console.log("trong saga hoc khoa hoc: ", course);
//     const { payload } = course;
//     try {
//       const res = yield call(callApi, `courses/${payload}/learn`, "GET", null);
//       const { data } = res;
//       yield put(coursesActions.learncourseSuccess(data));
//     } catch (err) {
//       yield put(coursesActions.learncourseError);
//     }
//   }
//Lang nghe cac function o tren
function* challengesWatcher() {
  yield fork(getChallengesRequest);
  yield takeLatest(
    ChallengesConstants.GET_CHALLENGE_DETAILS_REQUEST,
    getChallengeDetailsRequest
  );
  //   yield takeLatest(coursesConstants.DELETECOURSES_REQUEST, deletecourseRequest);
  //   yield takeLatest(
  //     coursesConstants.GETCOURSEDETAILS_REQUEST,
  //     getcoursedetailsRequest
  //   );
  //   yield takeLatest(coursesConstants.LEARNCOURSE_REQUEST, learncourseRequest);
}
export default challengesWatcher;
