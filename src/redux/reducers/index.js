import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { statusInterest } from './status.interest.reducer'
import { statusUser } from './status.user.reducer'
import { inputInterestData } from './input.interest.reducer';
import { inputActivityData } from './input.activity.reducer';
import { inputLocationData } from './input.location.reducer';
import { otherUser } from './other.user.reducer';
import { otherUserStatus } from './other.user.status.reducer';
<<<<<<< HEAD
import { firstProfileData } from "./first.profile.reducer";
import { like } from "./like.reducer";
=======
import { otherUserActivity } from './other.user.activity.reducer'
import { firstProfileData } from './first.profile.reducer';
>>>>>>> 0ff8fbab578c0ccbdd17293171a040d3877be0ce

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    statusInterest,
    statusUser,
    inputInterestData,
    inputActivityData,
    inputLocationData,
    otherUser,
    otherUserStatus,
<<<<<<< HEAD
    firstProfileData,
    like
=======
    otherUserActivity,
    firstProfileData,
>>>>>>> 0ff8fbab578c0ccbdd17293171a040d3877be0ce
});

export default rootReducer;