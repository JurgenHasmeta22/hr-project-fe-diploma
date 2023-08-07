import axios from 'axios';

const api = {
	url: import.meta.env.VITE_API_URL
};

const authenticationController = {
	getAllProjects: async () => {
		return await axios.get(`${api}/Projekt/getAllProjects`);
	},
	deleteProject: async (projectId: any) => {
		return await axios.delete(`${api}/Projekt/Delete/${projectId}`);
	},
	updateProject: async (projectId: any, model: any) => {
		return await axios.put(`${api}/Projekt/Put/${projectId}`, model);
	},
	addProject: async (model: any) => {
		return await axios.post(`${api}/Projekt`, model);
	}
};

export default authenticationController;
