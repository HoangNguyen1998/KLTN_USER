import * as NotifiConstants from 'constants/Notification'

export const Add_Notifi = (data) =>{
    return {
        type: NotifiConstants.ADD_NOTIFI,
        payload: data
    }
}

export const Delete_Count = ()=>{
    return {
        type: NotifiConstants.DELETE_COUNT
    }
}