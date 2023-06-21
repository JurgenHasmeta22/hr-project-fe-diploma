import { combineReducers } from '@reduxjs/toolkit';
import loginStore from '../stores/login/login.store';
import userStore from '../stores/user/user.store';

const rootReducer = combineReducers({
	login: loginStore.reducer,
	user: userStore.reducer
});

export default rootReducer;
