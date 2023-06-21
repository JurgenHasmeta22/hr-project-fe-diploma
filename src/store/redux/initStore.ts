import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const initStore = (currentUser: any) => {
	const appStore = configureStore({
		reducer: rootReducer
	});

	// if (currentUser) appStore.dispatch(setUser(currentUser));
	return appStore;
};

export default initStore;
