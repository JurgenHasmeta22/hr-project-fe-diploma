import axios from 'axios';

const api = {
	url: import.meta.env.VITE_API_URL
};

const authenticationController = {
	onLogin: async (model: any): Promise<any> => {
		return await axios.post(`${api.url}/Account/login`, model).then((x) => x.data);
	},
	onRegister: async (model: any): Promise<any> => {
		return await axios.post(`${api.url}/Account/register`, model).then((x) => x.data);
	},
	onLogout: () => {
		localStorage.removeItem('token');
	}
};

export default authenticationController;
