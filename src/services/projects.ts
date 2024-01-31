import axios from 'axios';

const projectsController = {
  getAllProjects: async () => {
    return await axios
      .get('https://localhost:7006/Projekt/getAllProjects')
      .then((x) => x.data);
  },
  getProject: async (projectId: string) => {
    return await axios
      .get(`https://localhost:7006/Projekt/GetById/${projectId}`)
      .then((x) => x.data);
  },
  deleteProject: async (projectId: any) => {
    return await axios
      .delete(`https://localhost:7006/Projekt/Delete/${projectId}`)
      .then((x) => x.data);
  },
  updateProject: async (projectId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/Projekt/Put/${projectId}`, model)
      .then((x) => x.data);
  },
  addProject: async (model: any) => {
    return await axios
      .post('https://localhost:7006/Projekt', model)
      .then((x) => x.data);
  },
  assignProjectToUser: async (userId: any, projektId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AssignProjectToUser/${userId},${projektId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteProjectToUser: async (userId: any, projektId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteMappedProjectToUser/${userId},${projektId}`
      )
      .then((x) => x.data);
  },
};

export default projectsController;
