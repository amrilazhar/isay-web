import {inputInterestConstant} from "../type";
import axios from "axios";

export const inputInterestData = {
    getInputInterest
};

function getInputInterest (interest) {
    return dispatch => {
        dispatch(request(interest))

        axios.get ("https://isay.gabatch11.my.id/utils/interest/topic")
        .then (response => {
            dispatch(success(response))
        })
        .catch(error => {
            dispatch(failure(error))
        })
    }

    function request(interest) {return {type: inputInterestConstant.GET_INPUT_INTEREST_REQUEST, interest}};
    function success(response) {return {type: inputInterestConstant.GET_INPUT_INTEREST_SUCCESS, payload: response.data}};
    function failure(error) {return {type: inputInterestConstant.GET_INPUT_INTEREST_FAILURE, error}}
}