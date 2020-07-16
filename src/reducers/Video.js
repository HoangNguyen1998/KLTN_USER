import * as VideoConstants from "constants/Video";
import findIndex from "lodash/findIndex";

const reducer = (
    state = {
        video: [],
        videoDetail: {},
    },
    action
) => {
    switch (action.type) {
        case VideoConstants.GET_ALL_VIDEO_SUCCESS: {
            const {payload} = action;
            console.log(payload);
            return {
                ...state,
                video: payload
            };
        }
        case VideoConstants.GET_VIDEO_DETAILS_SUCCESS: {
            const {payload} = action;
            return {
                ...state,
                videoDetail: payload
            };
        }
        default:
            return {...state};
    }
};

export default reducer;
