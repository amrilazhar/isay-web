import { alertConstants } from '../type';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message,
                alert: true
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message,
                alert:true
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}