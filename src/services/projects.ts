import axios from 'axios';

const projectsController = {
    getAllProjects: async () => {
        return await axios
            .get('https://localhost:7006/Projekt/getAllProjects')
            .then((response) => response.data);
    },
    getProject: async (projectId: string) => {
        return await axios
            .get(`https://localhost:7006/Projekt/${projectId}`)
            .then((response) => response.data);
    },
    deleteProject: async (projectId: any) => {
        return await axios
            .delete(`https://localhost:7006/Projekt/${projectId}`)
            .then((response) => response.data);
    },
    updateProject: async (projectId: any, model: any) => {
        return await axios
            .put(`https://localhost:7006/Projekt/${projectId}`, model)
            .then((response) => response.data);
    },
    addProject: async (model: any) => {
        return await axios
            .post('https://localhost:7006/Projekt', model)
            .then((response) => response.data);
    },
    assignProjectToUser: async (userId: any, projectId: any, model: any) => {
        return await axios
            .post(
                `https://localhost:7006/User/${userId}/Projekt/${projectId}`,
                model,
            )
            .then((response) => response.data);
    },
    deleteProjectToUser: async (userId: any, projectId: any) => {
        return await axios
            .delete(
                `https://localhost:7006/User/${userId}/Projekt/${projectId}`,
            )
            .then((response) => response.data);
    },
};

export default projectsController;
