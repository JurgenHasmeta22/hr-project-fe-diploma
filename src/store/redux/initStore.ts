import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const initStore = (currentUser: any) => {
	const appStore = configureStore({
		reducer: rootReducer
	});

	return appStore;
};

export default initStore;
