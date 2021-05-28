import {firstProfileConstant} from '../type';

const firstProfileState = {
    loading: true,
    profile: [],
    error: null
}

export function firstProfileData (state= firstProfileState, action) {
    switch(action.type) {
        case firstProfileConstant.FIRST_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case firstProfileConstant.FIRST_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case firstProfileConstant.FIRST_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}