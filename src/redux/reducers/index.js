import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { statusInterest } from './status.interest.reducer'
import { inputInterestData } from "./input.interest.reducer";
import { inputActivityData } from "./input.activity.reducer"

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    statusInterest,
    inputInterestData,
    inputActivityData
});

export default rootReducer;