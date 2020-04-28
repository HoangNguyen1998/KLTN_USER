import {call, put, takeLatest, take, fork} from "redux-saga/effects";
import * as TopicsConstants from "constants/Topics";
import * as TopicsActions from "actions/Topics";
import CallApi from "helpers/ApiCaller";

//Lay danh sach tat ca topics
function* gettopicsRequest() {
    while (true) {
        try {
            const action = yield take(TopicsConstants.GET_TOPICS_REQUEST);
            const res = yield call(CallApi, "topics", "GET", null);
            const {data} = res;
            yield put(TopicsActions.getTopicsSuccess(data.result));
            action.payload(false)
        } catch (err) {
            yield put(TopicsActions.getTopicsError(err));
        }
    }
}

//Lay chi tiet mot topic duoc chi dinh
function* gettopicdetailsRequest(data) {
    const {payload} = data;
    try {
        const res = yield call(CallApi, `vocabularies/topic/${payload}`, "GET", null);
        const {data} = res;
        console.log(res.data);
        yield put(TopicsActions.gettopicdetailsSuccess(data.result));
    } catch (err) {
        yield put(TopicsActions.gettopicdetailsError(err));
    }
}

//Hoc mot topic duoc chon
function* learntopicRequest(topic) {
    const {payload} = topic;
    try {
        const res = yield call(CallApi, `topics/${payload}/learn`, "GET", null);
        const {data} = res;
        yield put(TopicsActions.learntopicSuccess(data));
    } catch (err) {
        yield put(TopicsActions.learntopicError(err));
    }
}

//Lang nghe cac function o tren
function* topicsWatcher() {
    yield fork(gettopicsRequest);
    yield takeLatest(
        TopicsConstants.GET_TOPIC_DETAILS_REQUEST,
        gettopicdetailsRequest
    );
    yield takeLatest(TopicsConstants.LEARN_TOPIC_REQUEST, learntopicRequest);
}
export default topicsWatcher;
