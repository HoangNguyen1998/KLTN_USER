import { call, put, take, takeLatest, delay, fork } from "redux-saga/effects";
import * as CoursesConstants from "constants/Courses";
import * as LoadingActions from "actions/GlobalLoading";
import * as CoursesActions from "actions/Courses";
import CallApi from "helpers/ApiCaller";

function* Get_All_Courses_Request() {
  while (true) {
    try {
      yield take(CoursesConstants.GET_ALL_COURSES_REQUEST)
      yield put(LoadingActions.ShowLoading());
      const res = yield call(CallApi, "courses", "GET", null);
      const { data } = res;
      console.log("chay vao day: ", data);
      yield put(CoursesActions.Get_All_Courses_Success(data));
      yield put(LoadingActions.HideLoading());
    } catch (err) {
      console.log(err);
      yield delay(1000);
      yield put(LoadingActions.HideLoading());
      yield put(CoursesActions.Get_All_Courses_Error);
    }
  }
}

function* Add_Course_Request(dataCourse) {
  const { data, history, enqueueSnackbar, t } = dataCourse.payload;
  console.log(data)
  for (var i = 0; i < data.content.length; i++) {
    if (data.content[i].text === "" || data.content[i].mean === "") {
      data.content.splice(i, 1);
    }
  }
  try {
    yield put(LoadingActions.ShowLoading())
    const res = yield call(CallApi, "courses", "POST", data);
    console.log(res)
    // yield put(CoursesActions(res.data))
    yield put(LoadingActions.HideLoading())
    enqueueSnackbar(t("CreateCourseSuccess"), { variant: "success" })
    yield put(CoursesActions.Create_New_Course(data))
    yield put(CoursesActions.Show_Modal_Add_Course(false))
  } catch (err) {
    console.log(err.message)
    enqueueSnackbar(t("CreateCourseError"), { variant: "error" });
  }
}

function* CoursesWatcher() {
  yield fork(Get_All_Courses_Request);
  yield takeLatest(CoursesConstants.ADD_COURSE_REQUEST, Add_Course_Request)
}

export default CoursesWatcher;
