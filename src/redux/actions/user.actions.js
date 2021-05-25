import { userConstants } from '../type';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions'
import { history } from '../../helpers'


export const userActions = {
    login,
    logout,
    register,
    getActive,
    delete: _delete,
    resetPassword,
    postStatus
};

function login(email, password, from) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(email, password, confirmPassword, from) {
    return dispatch => {
        dispatch(request({email}));

        userService.register(email, password, confirmPassword)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getActive (active) {
    return dispatch => {
        dispatch(request(active));

        userService.getActive()
            .then(
                users => {
                    dispatch(success(users))
                })
            .catch(
                error => {dispatch(failure(error.toString()))}
            );
    };

    function request(active) { return { type: userConstants.GETACTIVE_REQUEST, active } }
    function success(users) { return { type: userConstants.GETACTIVE_SUCCESS, payload: users.data.data } }
    function failure(error) { return { type: userConstants.GETACTIVE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function resetPassword(emailReset) {
    return dispatch => {
        dispatch(request(emailReset));

        userService.resetPassword(emailReset)
            .then(
                user => dispatch(success(emailReset)),
                error => dispatch(failure(emailReset, error.toString()))
            );
    };

    function request(emailReset) { return { type: "EMAIL_RESET_LOADING", emailReset} }
    function success(emailReset) { return { type: "EMAIL_RESET_SUCCESS", emailReset } }
    function failure(emailReset, error) { return { type: "EMAIL_RESET_FAILURE", emailReset, error } }
}

function postStatus (content, interestId) {
    return dispatch => {
        dispatch(request());

        userService.postStatus(content, interestId)
            .then (
                content => dispatch(success(content)),
                error => dispatch(failure(content, error.toString()))
            );
    };

    function request(content) { return { type: "POST_STATUS_LOADING", content} }
    function success(content) { return { type: "POST_STATUS_SUCCESS", content } }
    function failure(content, error) { return { type: "POST_STATUS_FAILURE", content, error } }
}