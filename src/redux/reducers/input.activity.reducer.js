import {inputActivityConstant} from '../type';

const inputActivityState = {
    loading : true,
    activities : [],
    error : null
}

export function inputActivityData (state = inputActivityState, action) {
    switch (action.type) {
        case inputActivityConstant.GET_INPUT_ACTIVITY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case inputActivityConstant.GET_INPUT_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false,
                activities: action.payload
            }
        case inputActivityConstant.GET_INPUT_ACTIVITY_FAILURE:
            return{
                ...state,
        loading: false,
        error: action.error
      }
        default:
            return state
    }
}
