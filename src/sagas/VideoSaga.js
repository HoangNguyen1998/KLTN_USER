import {call, put, takeLatest, take, fork} from "redux-saga/effects";
import * as VideoActions from "actions/Video";
import * as VideoConstants from "constants/Video";
import CallApi from "helpers/ApiCaller";

//Lay danh sach tat ca khoa hoc cua nguoi dung
function* Get_All_Video_Request() {
    while (true) {
        try {
            const action = yield take(VideoConstants.GET_ALL_VIDEO_REQUEST);
            console.log("Hellloooo");
            const res = yield call(CallApi, "videoLinkGg", "GET", null);
            const {data} = res;
            console.log(data);
            yield put(VideoActions.Get_All_Video_Success(data.result));
            action.payload(false);
        } catch (err) {}
    }
}

function* Get_Video_Detail(data) {
    console.log("trong saga chi tiet khoa hoc: ", data);
    const {payload} = data;
    try {
        const res = yield call(CallApi, `videoLinkGg/${payload}`, "GET", null);
        const {data} = res;
        console.log(data.result);
        yield put(VideoActions.Get_Video_Detail_Success(data.result));
    } catch (err) {
        yield put(VideoActions.Get_Video_Detail_Error(err));
    }
}

function* videoWatcher() {
    yield fork(Get_All_Video_Request);
    yield takeLatest(
        VideoConstants.GET_VIDEO_DETAILS_REQUEST,
        Get_Video_Detail
    );
}
export default videoWatcher;
