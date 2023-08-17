import axios from 'axios';

const permissionsController = {
	askPermission: async (model: any, id: string) => {
		return await axios.post(`https://localhost:7006/AssignLejeToUser/${id}`, model).then((x) => x.data);
	},
	approvePermission: async (lejeId: any) => {
		return await axios.post(`https://localhost:7006/ApproveLeje/${lejeId}`, {}).then((x) => x.data);
	},
	dissaprovePermission: async (lejeId: any) => {
		return await axios.post(`https://localhost:7006/DisapproveLeje/${lejeId}`, {}).then((x) => x.data);
	},
	getAllPermissions: async () => {
		return await axios.get('https://localhost:7006/Leje/getAllLeje').then((x) => x.data);
	}
};

export default permissionsController;
