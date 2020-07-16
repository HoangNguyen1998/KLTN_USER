import {call, put, takeLatest, take, fork} from "redux-saga/effects";
import * as AlphabetActions from "actions/Alphabet";
import * as AlphabetConstants from "constants/Alphabet";
import CallApi from "helpers/ApiCaller";

//Lay danh sach tat ca khoa hoc cua nguoi dung
function* Get_All_Alphabet_Request() {
    while (true) {
        try {
            const action = yield take(
                AlphabetConstants.GET_ALL_ALPHABET_REQUEST
            );
            console.log("Hellloooo");
            const res = yield call(CallApi, "alphabet", "GET", null);
            const {data} = res;
            console.log(data);
            yield put(AlphabetActions.Get_All_Alphabet_Success(data.result));
            action.payload(false);
        } catch (err) {}
    }
}

function* Get_Alphabet_Detail(data) {
    console.log("trong saga chi tiet khoa hoc: ", data);
    const {payload} = data;
    try {
        const res = yield call(
            CallApi,
            `alphabet/${payload.id}`,
            "GET",
            null
        );
        const {data} = res;
        console.log(data.result);
        yield put(AlphabetActions.Get_Alphabet_Detail_Success(data.result));
        payload.isLoading(false)
    } catch (err) {
        yield put(AlphabetActions.Get_Alphabet_Detail_Error(err));
    }
}

function* alphabetWatcher() {
    yield fork(Get_All_Alphabet_Request);
    yield takeLatest(
        AlphabetConstants.GET_ALPHABET_DETAILS_REQUEST,
        Get_Alphabet_Detail
    );
    //   yield takeLatest(
    //     coursesConstants.GETCOURSEDETAILS_REQUEST,
    //     getcoursedetailsRequest
    //   );
    //   yield takeLatest(coursesConstants.LEARNCOURSE_REQUEST, learncourseRequest);
}
export default alphabetWatcher;
