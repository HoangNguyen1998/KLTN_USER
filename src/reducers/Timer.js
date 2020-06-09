import * as TimerConstants from "constants/Timer";

const reducer = (
    state = {
        totalSeconds: 0,
        old: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    action
) => {
    switch (action.type) {
        case TimerConstants.INCREASE_SECONDS: {
            console.log("Hello reducer", state.totalSeconds);
            let setToTalSeconds = state.totalSeconds + 1;
            let setHours = Math.floor(setToTalSeconds / 3600);
            let setMinutes = Math.floor(
                (setToTalSeconds - setHours * 3600) / 60
            );
            let setSeconds =
                setToTalSeconds - (setHours * 3600 + setMinutes * 60);
            return {
                ...state,
                totalSeconds: setToTalSeconds,
                hours: setHours,
                minutes: setMinutes,
                seconds: setSeconds,
            };
        }
        case TimerConstants.GET_TIMES_ONLINE_SUCCESS: {
            const {minute} = action.payload[0];
            console.log(minute*60)
            let setToTalSeconds = minute * 60;
            let setHours = Math.floor(setToTalSeconds / 3600);
            let setMinutes = Math.floor(
                (setToTalSeconds - setHours * 3600) / 60
            );
            let setSeconds =
                setToTalSeconds - (setHours * 3600 + setMinutes * 60);
            return {
                ...state,
                old: minute,
                totalSeconds: setToTalSeconds,
                hours: setHours,
                minutes: setMinutes,
                seconds: setSeconds,
            };
        }
        default:
            return {...state};
    }
};

export default reducer;
