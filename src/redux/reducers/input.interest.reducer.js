import { inputInterestConstant } from '../type';

const inputInterestState = {
  loading: true,
  interest: [],
  error: null
}

export function inputInterestData (state = inputInterestState, action) {
  switch (action.type) {
    case inputInterestConstant.GET_INPUT_INTEREST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case inputInterestConstant.GET_INPUT_INTEREST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        interest: action.payload
      };
    case inputInterestConstant.GET_INPUT_INTEREST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}