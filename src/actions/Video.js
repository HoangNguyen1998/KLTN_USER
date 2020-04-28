import * as VideoConstants from "constants/Video";

export const Get_All_Video_Request = (data) => {
    return {
        type: VideoConstants.GET_ALL_VIDEO_REQUEST,
        payload: data,
    };
};

export const Get_All_Video_Error = (errors) => {
    return {
        type: VideoConstants.GET_ALL_VIDEO_ERROR,
        payload: errors,
    };
};

export const Get_All_Video_Success = (success) => {
    return {
        type: VideoConstants.GET_ALL_VIDEO_SUCCESS,
        payload: success,
    };
};

export const Get_Video_Detail_Request = (data) => {
    return {
        type: VideoConstants.GET_VIDEO_DETAILS_REQUEST,
        payload: data,
    };
};

export const Get_Video_Detail_Error = (errors) => {
    return {
        type: VideoConstants.GET_VIDEO_DETAILS_ERROR,
        payload: errors,
    };
};

export const Get_Video_Detail_Success = (success) => {
    return {
        type: VideoConstants.GET_VIDEO_DETAILS_SUCCESS,
        payload: success,
    };
};
