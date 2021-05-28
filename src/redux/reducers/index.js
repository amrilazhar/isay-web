import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./user.reducer";
import { alert } from "./alert.reducer";
import { statusInterest } from "./status.interest.reducer";
import { statusUser } from "./status.user.reducer";
import { inputInterestData } from "./input.interest.reducer";
import { inputActivityData } from "./input.activity.reducer";
import { inputLocationData } from "./input.location.reducer";
import {
	getOlderChat,
	getChatRoom,
	getChatHistory,
	setChatMessage,
	setReadedStatus,
	getRoomList,
} from "./chat.reducer";
import { otherUser } from './other.user.reducer';
import { otherUserStatus } from './other.user.status.reducer';
import { otherUserActivity } from './other.user.activity.reducer'
import { firstProfileData } from './first.profile.reducer';
import { like } from "./like.reducer";
import { listAvatar } from "./list.avatar.reducer";

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
	getChatRoom,
	getChatHistory,
	setChatMessage,
	setReadedStatus,
	getOlderChat,
	getRoomList,
    otherUser,
    otherUserStatus,
    firstProfileData,
    otherUserActivity,
    like,
    listAvatar
});

export default rootReducer;
