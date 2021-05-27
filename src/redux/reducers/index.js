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
} from "./chat.reducer";

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
});

export default rootReducer;
