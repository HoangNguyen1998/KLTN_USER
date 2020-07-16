import { call, put, takeLatest, take, fork } from "redux-saga/effects";
import * as MessagesConstants from "../constants/Messages";
import * as MessagesActions from "../actions/Messages";
import CallApi from "helpers/ApiCaller";

function* Get_List_Messages_Request() {
  while (true) {
    try {
      const action = yield take(MessagesConstants.GET_MESSAGES_FRIEND_REQUEST);
      const res = yield call(CallApi, "challenges", "GET", null);
      const { data } = res;
    } catch (err) {}
  }
}





function* messagesWatcher() {
  yield fork(Get_List_Messages_Request);
}
export default messagesWatcher;
