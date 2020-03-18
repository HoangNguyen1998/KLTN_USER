import {
    call,
    put,
    takeLatest,
    takeEvery,
    delay,
    take,
    fork
} from "redux-saga/effects";
import * as GetMeConstants from "constants/GetMe";
import * as GetMeActions from "actions/GetMe";
import {showLoading, hideLoading} from "../actions/GlobalLoading";
import deleteToken from "helpers/DeleteCookies";
import * as getmeActions from "../actions/GetMe";
import CallApi from "helpers/ApiCaller";

function* Sign_Out_Request(action) {
    console.log("fgdgsdfdfg: ", action)
    const {payload} = action;
    yield put(GetMeActions.Reset_Me());
    yield call(deleteToken, "token");
    yield delay(200);
    payload.push("/signin");
}
function* homeWatcher() {
    //yield fork(signoutRequest);
    yield takeLatest(GetMeConstants.SIGN_OUT, Sign_Out_Request);
}
export default homeWatcher;
