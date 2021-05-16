import { inputLocationConstant } from "../type";

const inputLocationState = {
    loading: true,
    locations: [],
    error: null
}

export function inputLocationData (state= inputLocationState, action) {
    switch(action.type) {
        case inputLocationConstant.GET_INPUT_LOCATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case inputLocationConstant.GET_INPUT_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: action.payload
            };
        case inputLocationConstant.GET_INPUT_LOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error            
            };
        default:
            return state
    }
}