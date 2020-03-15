import * as CoursesConstants from "constants/Courses";

const reducer = (state = { courses: [], course: { title: "", content: [] }, showModal: false }, action) => {
  switch (action.type) {
    case CoursesConstants.GET_ALL_COURSES_REQUEST: {
      return { ...state };
    }
    case CoursesConstants.GET_ALL_COURSES_SUCCESS: {
      const { payload } = action;
      return { ...state, courses: [...state.courses, ...payload] }
    }
    case CoursesConstants.GET_ALL_COURSES_ERROR: {
      return { ...state };
    }
    case CoursesConstants.SHOW_MODAL_ADD_COURSE: {
      return { ...state, showModal: action.payload }
    }
    case CoursesConstants.CREATE_NEW_COURSE: {
      const data = [...state.courses]
      data.unshift(action.payload)
      return { ...state, courses: [...data] }
    }
    default:
      return { ...state };
  }
};

export default reducer;
