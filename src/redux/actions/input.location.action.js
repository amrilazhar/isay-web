import { inputLocationConstant } from "../type";
import axios from "axios";

export const inputLocationData = {
    getInputLocation
}

function getInputLocation(locations) {
    return dispatch => {
        dispatch(request(locations))

        axios.get('https://isay.gabatch11.my.id/utils/location')
        .then (response => {
            dispatch(success(response))
        })
        .catch((error) => {
            dispatch(failure(error))
        })
    };
    
    function request(locations) {
        return {type: inputLocationConstant.GET_INPUT_LOCATION_REQUEST, locations}
    };
    function success (response) {
        return {type: inputLocationConstant.GET_INPUT_LOCATION_SUCCESS, payload: response.data}
    };
    function failure (error) {
        return {type: inputLocationConstant.GET_INPUT_LOCATION_FAILURE, error}
    };
}