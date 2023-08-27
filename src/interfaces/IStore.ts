import IUser from './IUser';

export default interface AppStoreState {
	user: any | null;
	setUser: (data: any) => void;
	unsetUser: () => void;
	loadUserFromLocalStorage: () => void;
}
