import * as CoursesConstants from "constants/Courses";
import findIndex from "lodash/findIndex";
import * as GetMeConstants from "constants/GetMe";

const reducer = (
    state = {
        history: [],
        courses: [],
        course: {title: "", contents: []},
        isLoading: true,
        courseLearn: [],
    },
    action
) => {
    switch (action.type) {
        case CoursesConstants.GET_ALL_COURSES_REQUEST: {
            return {...state};
        }
        case CoursesConstants.GET_ALL_COURSES_SUCCESS: {
            const {payload} = action;
            const dataReverse = payload.reverse();
            return {
                ...state,
                courses: [...dataReverse],
                isLoading: false,
            };
        }
        case CoursesConstants.GET_ALL_COURSES_ERROR: {
            return {...state};
        }
        case CoursesConstants.SHOW_MODAL_ADD_COURSE: {
            return {...state, showModal: action.payload};
        }
        case CoursesConstants.CREATE_NEW_COURSE: {
            const data = [...state.courses];
            data.unshift(action.payload);
            return {...state, courses: [...data]};
        }
        case CoursesConstants.GET_COURSE_REQUEST: {
            return {...state};
        }
        case CoursesConstants.GET_COURSE_SUCCESS: {
            const {data, dataLearn} = action.payload;
            const {title, contents} = data;
            return {
                ...state,
                course: {...state.course, title: title, contents: contents},
                courseLearn: dataLearn,
            };
        }
        case CoursesConstants.DELETE_COURSE_SUCCESS: {
            const result = findIndex(state.courses, {_id: action.payload});
            const data = [...state.courses];
            data.splice(result, 1);
            return {...state, courses: [...data]};
        }
        case CoursesConstants.RESET_COURSE_MODAL: {
            console.log("HEllllllloo");
            return {
                ...state,
                course: {title: "", contents: []},
                courseLearn: [],
            };
        }
        case GetMeConstants.SIGN_OUT:
            return {
                ...state,
                courses: [],
                course: {title: "", contents: []},
                isLoading: true,
                courseLearn: [],
            };
        case CoursesConstants.SAVE_ANSWER_HISTORY:
            return {...state};
        case CoursesConstants.UPDATE_DETAIL_ONE_SUCCESS:
            const data = [...state.course.contents];
            console.log(data);
            console.log("reducer: ", action.payload);
            const {_id, text, mean} = action.payload;
            for (let i = 0; i < data.length; i++) {
                if(data[i]._id===_id){
                    console.log(data[i]);
                    data[i].text=text
                    data[i].mean=mean
                }
            }
            return {
                ...state,
                course: {title: state.course.title, contents: [...data]},
            };
        default:
            return {...state};
    }
};

export default reducer;
