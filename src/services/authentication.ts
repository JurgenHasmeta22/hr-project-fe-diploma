import axios from 'axios';

const authenticationController = {
	onLogin: async (model: any): Promise<any> => {
		return await axios.post('https://localhost:7006/Account/login', model).then((x) => x.data);
	},
	onRegister: async (model: any): Promise<any> => {
		return await axios.post('https://localhost:7006/Account/register', model).then((x) => x.data);
	},
	onLogout: () => {
		localStorage.removeItem('token');
	}
};

export default authenticationController;
