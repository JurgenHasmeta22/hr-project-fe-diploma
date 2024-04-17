import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const projectService = {
    getAllProjects: async () => {
        return await axios
            .get(`${apiUrl}/Projekt/getAllProjects`)
            .then((response) => response.data);
    },
    getProject: async (projectId: string) => {
        return await axios
            .get(`${apiUrl}/Projekt/GetById/${projectId}`)
            .then((response) => response.data);
    },
    deleteProject: async (projectId: any) => {
        return await axios
            .delete(`${apiUrl}/Projekt/Delete/${projectId}`)
            .then((response) => response.data);
    },
    updateProject: async (projectId: any, model: any) => {
        return await axios
            .put(`${apiUrl}/Projekt/Put/${projectId}`, model)
            .then((response) => response.data);
    },
    addProject: async (model: any) => {
        return await axios.post(`${apiUrl}/Projekt`, model).then((response) => response.data);
    },
    assignProjectToUser: async (userId: any, projektId: any, model: any) => {
        return await axios
            .post(`${apiUrl}/User/AssignProjectToUser/${userId},${projektId}`, model)
            .then((response) => response.data);
    },
    deleteProjectToUser: async (userId: any, projektId: any) => {
        return await axios
            .delete(`${apiUrl}/User/DeleteMappedProjectToUser/${userId},${projektId}`)
            .then((response) => response.data);
    },
};

export default projectService;
