import axios from 'axios';
import IUser from '~/interfaces/IUser';

const api = {
	url: import.meta.env.VITE_API_URL
};

const authenticationController = {
	onLogin: async (email: string, password: string): Promise<any> => {
		const payload = {
			email,
			password
		};

		const responseLogin = await axios.post(`${api.url}/login`, payload).then((x) => x.data);

		return responseLogin;
	},

	onRegister: async (username: string, email: string, password: string): Promise<any> => {
		const payload = {
			username,
			email,
			password
		};

		const responseLogin = await axios.post(`${api.url}/sign-up`, payload).then((x) => x.data);

		return responseLogin;
	},

	validateUser: async () => {
		if (localStorage.token) {
			const config = {
				headers: {
					Authorization: localStorage.token
				}
			};

			const response: IUser = await axios.get(`${api.url}/validate`, config).then((x) => x.data);
			return response;
		}
	}
};

export default authenticationController;
