import {call, put, take, takeLatest, delay, fork} from "redux-saga/effects";
import * as CoursesConstants from "constants/Courses";
import * as LoadingActions from "actions/GlobalLoading";
import * as CoursesActions from "actions/Courses";
import CallApi from "helpers/ApiCaller";

function* Get_All_Courses_Request() {
    while (true) {
        try {
            const action = yield take(CoursesConstants.GET_ALL_COURSES_REQUEST);
            const res = yield call(CallApi, "users/get-courses-latest", "GET", null);
            const {data} = res;
            yield put(CoursesActions.Get_All_Courses_Success(data.result.courses));
            if (action) action.payload(false);
        } catch (err) {
            yield put(CoursesActions.Get_All_Courses_Error);
        }
    }
}

function* Update_Detail_One_Request(data) {
    console.log(data.payload);
    const {id, text, mean} = data.payload;
    const res = yield call(CallApi, `content/${id}`,"PUT", {text, mean});
    yield put(CoursesActions.Update_Detail_One_Success(res.data.result));
}

function* Add_Course_Request(dataCourse) {
    const {data, history, enqueueSnackbar, t} = dataCourse.payload;
    for (var i = 0; i < data.content.length; i++) {
        if (data.content[i].text === "" || data.content[i].mean === "") {
            data.content.splice(i, 1);
        }
    }
    try {
        yield put(LoadingActions.ShowCirCular());
        const res = yield call(CallApi, "courses", "POST", data);
        // yield put(CoursesActions(res.data))
        console.log(res.data.result);
        enqueueSnackbar(t("CreateCourseSuccess"), {variant: "success"});
        yield put(CoursesActions.Create_New_Course(res.data.result));
        yield put(CoursesActions.Show_Modal_Add_Course(false));
        yield put(LoadingActions.HideCirCular());
        history.goBack();
    } catch (err) {
        console.log(err);
        enqueueSnackbar(t("CreateCourseError"), {variant: "error"});
        yield put(LoadingActions.HideCirCular());
    }
}

function* Get_Course_Request(action) {
    const {payload} = action;
    try {
        console.log(payload);
        const res = yield call(CallApi, `courses/${payload}`, "GET", null);
        const resLearn = yield call(
            CallApi,
            `courses/${payload}/learn`,
            "GET",
            null
        );
        yield put(
            CoursesActions.Get_Course_Success(
                res.data.result,
                resLearn.data.result
            )
        );
    } catch (err) {
        console.log(err);
    }
}

function* Delete_Course_Request(action) {
    const {id, showModal} = action.payload;
    try {
        yield put(LoadingActions.ShowCirCular());
        const res = yield call(CallApi, `courses/${id}`, "DELETE", null);
        yield put(CoursesActions.Delete_Course_Success(id));
        showModal(false);
        yield put(LoadingActions.HideCirCular());
    } catch (err) {
        console.log(err);
    }
}

function* CoursesWatcher() {
    yield fork(Get_All_Courses_Request);
    yield takeLatest(
        CoursesConstants.UPDATE_DETAIL_ONE_REQUEST,
        Update_Detail_One_Request
    );
    yield takeLatest(CoursesConstants.ADD_COURSE_REQUEST, Add_Course_Request);
    yield takeLatest(CoursesConstants.GET_COURSE_REQUEST, Get_Course_Request);
    yield takeLatest(
        CoursesConstants.DELETE_COURSE_REQUEST,
        Delete_Course_Request
    );
}

export default CoursesWatcher;
