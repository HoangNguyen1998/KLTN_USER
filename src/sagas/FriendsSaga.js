import { call, put, takeLatest, take, fork } from "redux-saga/effects";
import * as FriendsConstants from "../constants/Friends";
import * as FriendsActions from "../actions/Friends";
import CallApi from "helpers/ApiCaller";

function* Get_List_Friends_Request() {
  while (true) {
    try {
      const action = yield take(FriendsConstants.GET_LIST_FRIENDS_REQUEST);
      const res = yield call(CallApi, "challenges", "GET", null);
      const { data } = res;
    //   action.payload(false)
    } catch (err) {}
  }
}

function* Get_List_Users_Request() {
  while (true) {
    try {
      const action = yield take(FriendsConstants.GET_LIST_USERS_REQUEST);
      const res = yield call(CallApi, "users/notFriend", "GET", null);
      const { data } = res;
      console.log(data)
      yield put(FriendsActions.Get_List_Users_Success(data.result))
    //   action.payload(false)
    } catch (err) {}
  }
}

function* Get_List_Add_Friend_Request() {
  while (true) {
    try {
      const action = yield take(FriendsConstants.GET_LIST_ADD_FRIEND_REQUEST);
      const res = yield call(CallApi, "users/senderAddFriend", "GET", null);
      const { data } = res;
      console.log(data)
      yield put(FriendsActions.Get_List_Add_Friend_Success(data.result))
    //   action.payload(false)
    } catch (err) {}
  }
}

function* Get_List_Request_Friend_Request() {
  while (true) {
    try {
      const action = yield take(FriendsConstants.GET_LIST_ADD_FRIEND_REQUEST);
      const res = yield call(CallApi, "users/requestAddFriend", "GET", null);
      const { data } = res;
      console.log(data)
      yield put(FriendsActions.Get_List_Request_Friend_Success(data.result))
    //   action.payload(false)
    } catch (err) {}
  }
}


// function* getChallengeDetailsRequest(data) {
//   console.log("trong saga chi tiet khoa hoc: ", data);
//   const { payload } = data;
//   try {
//     const res = yield call(CallApi, `challenges/${payload.id}`, "GET", null);
//     const resComments = yield call(CallApi, `comments/challenge/${payload.id}`, "GET", null)
//     const { data } = res;
//     yield put(ChallengesActions.Get_Challenge_Details_Success(data));
//     yield put(ChallengesActions.Get_Comments(resComments.data.result))
//     payload.setIsWaiting(false)
//   } catch (err) {
//     yield put(ChallengesActions.Get_Challenge_Details_Error(err));
//   }
// }

function* challengesWatcher() {
  yield fork(Get_List_Friends_Request);
  yield fork(Get_List_Users_Request)
  yield fork(Get_List_Add_Friend_Request)
  yield fork(Get_List_Request_Friend_Request)
//   yield takeLatest(
//     ChallengesConstants.GET_CHALLENGE_DETAILS_REQUEST,
//     getChallengeDetailsRequest
//   );
}
export default challengesWatcher;
