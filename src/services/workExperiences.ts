import axios from 'axios';

const workExperiencesController = {
  addWorkExperience: async (model: any, id: string) => {
    return await axios
      .post(`https://localhost:7006/api/PervojePune/addWorkExperience`, model)
      .then((x) => x.data);
  },
  removeWorkExperience: async (id: string) => {
    return await axios
      .delete(`https://localhost:7006/api/PervojePune/removeWorkExperience`)
      .then((x) => x.data);
  },
  updateWorkExperience: async (model: any, id: string) => {
    return await axios
      .put(
        `https://localhost:7006/api/PervojePune/updateWorkExperience/${id}`,
        model
      )
      .then((x) => x.data);
  },
  assignWorkExperience: async (model: any) => {
    return await axios
      .post(`https://localhost:7006/api/PervojePune/asignWorkExperience`, model)
      .then((x) => x.data);
  },
};

export default workExperiencesController;
