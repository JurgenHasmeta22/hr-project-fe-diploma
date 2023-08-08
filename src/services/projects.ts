import axios from 'axios';

const projectsController = {
	getAllProjects: async () => {
		return await axios.get('https://localhost:7006/Projekt/getAllProjects').then((x) => x.data);
	},
	deleteProject: async (projectId: any) => {
		return await axios.delete(`https://localhost:7006/Projekt/Delete/${projectId}`).then((x) => x.data);
	},
	updateProject: async (projectId: any, model: any) => {
		return await axios.put(`https://localhost:7006/Projekt/Put/${projectId}`, model).then((x) => x.data);
	},
	addProject: async (model: any) => {
		return await axios.post('https://localhost:7006/Projekt', model).then((x) => x.data);
	}
};

export default projectsController;
