import axios from 'axios';

const api = {
	url: import.meta.env.VITE_API_URL
};

const permissionsController = {
	askPermission: async (model: any, id: number) => {
		return await axios.post(`${api}/AssignLejeToUser/${id}`, model);
	},
	approvePermission: async (lejeId: any) => {
		return await axios.post(`${api}/ApproveLeje/${lejeId}`, {});
	},
	dissaprovePermission: async (lejeId: any) => {
		return await axios.post(`${api}/DisapproveLeje/${lejeId}`, {});
	},
	getAllPermissions: async () => {
		return await axios.get(`${api}/Leje/getAllLeje`);
	}
};

export default permissionsController;
