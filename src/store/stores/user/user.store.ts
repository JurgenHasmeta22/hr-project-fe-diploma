import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../../interfaces/IUser';

const initialState = {
	user: {
		email: '',
		password: ''
	}
};

const userStore = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		}
	}
});

export default userStore;

export const { setUser } = userStore.actions;
