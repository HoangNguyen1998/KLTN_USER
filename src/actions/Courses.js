import * as CoursesConstants from "constants/Courses";

export const Get_All_Courses_Request = () => {
  return {
    type: CoursesConstants.GET_ALL_COURSES_REQUEST
  };
};

export const Get_All_Courses_Error = errors => {
  return {
    type: CoursesConstants.GET_ALL_COURSES_ERROR,
    payload: errors
  };
};

export const Get_All_Courses_Success = data => {
  return {
    type: CoursesConstants.GET_ALL_COURSES_SUCCESS,
    payload: data
  };
};

export const Add_Word = (data, title) => {
  return {
    type: CoursesConstants.ADD_WORD,
    payload: {data, title}
  };
};

export const Add_Course_Request = (data, history, enqueueSnackbar, t) => {
  return {
    type: CoursesConstants.ADD_COURSE_REQUEST,
    payload: {data, history, enqueueSnackbar, t}
  };
}; 

export const Add_Course_Success = success => {
  return {
    type: CoursesConstants.ADD_COURSE_SUCCESS,
    payload: success
  };
};

export const Add_Course_Error = error => {
  return {
    type: CoursesConstants.ADD_COURSE_ERROR,
    payload: error
  };
};

export const Create_New_Course = data=>{
  return {
    type: CoursesConstants.CREATE_NEW_COURSE,
    payload: data
  }
}

export const Show_Modal_Add_Course=result=>{
  return {
    type: CoursesConstants.SHOW_MODAL_ADD_COURSE,
    payload: result
  }
}