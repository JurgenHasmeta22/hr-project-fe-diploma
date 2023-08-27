import axios from 'axios';

const permissionsController = {
	askPermission: async (model: any, id: string) => {
		return await axios.post(`https://localhost:7006/User/AssignLejeToUser/${id}`, model).then((x) => x.data);
	},
	approvePermission: async (lejeId: any) => {
		return await axios.post(`https://localhost:7006/User/ApproveLeje/${lejeId}`, {}).then((x) => x.data);
	},
	dissaprovePermission: async (lejeId: any) => {
		return await axios.post(`https://localhost:7006/User/DisapproveLeje/${lejeId}`, {}).then((x) => x.data);
	},
	deletePermission: async (lejeId: any) => {
		return await axios.delete(`https://localhost:7006/DeleteLejeOfUser/${lejeId}`).then((x) => x.data);
	},
	getAllPermissions: async () => {
		return await axios.get('https://localhost:7006/Leje/getAllLeje').then((x) => x.data);
	}
};

export default permissionsController;
