import * as CoursesConstants from "constants/Courses";

export const Get_All_Courses_Request = (IsWaiting) => {
  return {
    type: CoursesConstants.GET_ALL_COURSES_REQUEST,
    payload: IsWaiting
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

export const Add_Course_Request = (data, history, enqueueSnackbar, t, onHideCreateCourse) => {
  return {
    type: CoursesConstants.ADD_COURSE_REQUEST,
    payload: {data, history, enqueueSnackbar, t, onHideCreateCourse}
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

export const Get_Course_Request = (id)=>{
  return {
    type: CoursesConstants.GET_COURSE_REQUEST,
    payload: id
  }
}

export const Get_Course_Success = (data, dataLearn)=>{
  return {
    type: CoursesConstants.GET_COURSE_SUCCESS,
    payload: {data, dataLearn}
  }
}

export const Delete_Course_Request=(id, showModal)=>{
  return {type: CoursesConstants.DELETE_COURSE_REQUEST, payload: {id, showModal}}
}

export const Delete_Course_Success=(id)=>{
  return {type: CoursesConstants.DELETE_COURSE_SUCCESS, payload: id}
}

export const Delete_Course_Error=(id)=>{
  return {type: CoursesConstants.DELETE_COURSE_ERROR}
}

export const Reset_Course_Modal=()=>{
  return {type: CoursesConstants.RESET_COURSE_MODAL}
}
