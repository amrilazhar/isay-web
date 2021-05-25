import {inputActivityConstant} from "../type";
import axios from "axios";

export const inputActivityData = {
    getInputActivity
};

function getInputActivity (activities) {
    return dispatch => {
        dispatch(request(activities))

        axios.get ("https://isay.gabatch11.my.id/utils/interest/activity")
        .then (response => {
            setTimeout(() => {
              dispatch(success(response))
            }, 2500)
          })
        .catch((error) => {
            dispatch(failure(error))
        })
    };

    function request(activities) {
        return {type: inputActivityConstant.GET_INPUT_ACTIVITY_REQUEST, activities}
    };
    function success(response) {return {type: inputActivityConstant.GET_INPUT_ACTIVITY_SUCCESS, payload: response.data}};
    function failure(error) {return {type: inputActivityConstant.GET_INPUT_ACTIVITY_FAILURE, error}}
}
