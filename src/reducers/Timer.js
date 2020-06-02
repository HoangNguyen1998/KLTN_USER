import * as TimerConstants from "constants/Timer";

const reducer = (
    state = {
        totalSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    action
) => {
    switch (action.type) {
        case TimerConstants.INCREASE_SECONDS: {
            console.log("Hello reducer", state.totalSeconds)
            var setToTalSeconds = state.totalSeconds + 1;
            var setHours = Math.floor(setToTalSeconds / 3600);
            var setMinutes = Math.floor(
                (setToTalSeconds - setHours * 3600) / 60
            );
            var setSeconds =
                setToTalSeconds - (setHours * 3600 + setMinutes * 60);
            return {
                ...state,
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
