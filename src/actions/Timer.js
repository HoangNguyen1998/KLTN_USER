import * as timerConstant from "constants/Timer";

export const Increase_Second = () => {
    return {
        type: timerConstant.INCREASE_SECONDS,
    };
};

export const Get_Times_Online_Request = (date) =>{
    return {
        type: timerConstant.GET_TIMES_ONLINE_REQUEST,
        payload: {date}
    }
}

export const Get_Times_Online_Success = (data) =>{
    return {
        type: timerConstant.GET_TIMES_ONLINE_SUCCESS,
        payload: data
    }
}

export const Get_Times_Online_Error = () =>{
    return {
        type: timerConstant.GET_TIMES_ONLINE_ERROR,
    }
}