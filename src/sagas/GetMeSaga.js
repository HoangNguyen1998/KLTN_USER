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
import * as LoadingActions from "actions/GlobalLoading";
import deleteToken from "helpers/DeleteCookies";
import CallApi from "helpers/ApiCaller";

function* Sign_Out_Request(action) {
    console.log("fgdgsdfdfg: ", action)
    const {payload} = action;
    yield put(GetMeActions.Reset_Me());
    yield call(deleteToken, "token");
    yield delay(200);
    payload.push("/signin");
}
function* Get_Me_Request(){
    while(true){
        try{
        yield take(GetMeConstants.GET_ME_REQUEST)
        console.log("saga")
        // yield put(LoadingActions.ShowLoading());
        const res=yield call(CallApi, "users/me", "GET", null)
        yield put(GetMeActions.Get_Me_Success(res.data.result))
        // yield delay(1000)
        // yield put(LoadingActions.HideLoading());
        } catch(err){
            console.log("Hello")
        }
    }
}
function* homeWatcher() {
    yield fork(Get_Me_Request);
    yield takeLatest(GetMeConstants.SIGN_OUT, Sign_Out_Request);
}
export default homeWatcher;
