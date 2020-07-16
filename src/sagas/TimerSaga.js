import {call, put, takeLatest, take, fork} from "redux-saga/effects";
import * as TimerActions from "actions/Timer";
import * as TimerConstants from "constants/Timer";
import CallApi from "helpers/ApiCaller";


//Lay danh sach tat ca khoa hoc cua nguoi dung
function* Get_Times_Online_Request() {
    while (true) {
        try {
            const action = yield take(
                TimerConstants.GET_TIMES_ONLINE_REQUEST
            );
            console.log("Hellloooo", action);
            const {payload}=action
            const res = yield call(CallApi, `timeOnline?filter={"date":"${payload.date}"}`, "GET", null);
            const {data} = res;
            console.log(data);
            yield put(TimerActions.Get_Times_Online_Success(data.result));
        } catch (err) {
            console.log(err)
        }
    }
}

// function* Get_Alphabet_Detail(data) {
//     console.log("trong saga chi tiet khoa hoc: ", data);
//     const {payload} = data;
//     try {
//         const res = yield call(
//             CallApi,
//             `alphabet/${payload.id}`,
//             "GET",
//             null
//         );
//         const {data} = res;
//         console.log(data.result);
//         yield put(TimerActions.Get_Alphabet_Detail_Success(data.result));
//         payload.isLoading(false)
//     } catch (err) {
//         yield put(TimerActions.Get_Alphabet_Detail_Error(err));
//     }
// }

function* alphabetWatcher() {
    yield fork(Get_Times_Online_Request);
    // yield takeLatest(
    //     TimerConstants.GET_ALPHABET_DETAILS_REQUEST,
    //     Get_Alphabet_Detail
    // );
    //   yield takeLatest(
    //     coursesConstants.GETCOURSEDETAILS_REQUEST,
    //     getcoursedetailsRequest
    //   );
    //   yield takeLatest(coursesConstants.LEARNCOURSE_REQUEST, learncourseRequest);
}
export default alphabetWatcher;
