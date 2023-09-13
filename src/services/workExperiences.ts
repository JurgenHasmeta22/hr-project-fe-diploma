import axios from 'axios';

const workExperiencesController = {
  createWorkExpierence: async (model: any) => {
    return await axios
      .post('https://localhost:7006/api/PervojePune', model)
      .then((x) => x.data);
  },
  editWorkExpierence: async (edukimId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/api/PervojePune/${edukimId}`, model)
      .then((x) => x.data);
  },
  deleteWorkExpierence: async (edukimId: any) => {
    return await axios
      .delete(`https://localhost:7006/api/PervojePune/${edukimId}`)
      .then((x) => x.data);
  },
  addUserertificate: async (workExperienceId: any, userId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AddUserPervojePune/${workExperienceId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  editUserWorkExpierence: async (
    workExperienceId: any,
    userId: any,
    model: any
  ) => {
    return await axios
      .put(
        `https://localhost:7006/User/UpdateUserPervojePune/${workExperienceId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteUserWorkExpierence: async (workExperienceId: any, userId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteUserPervojePune/${workExperienceId},${userId}`
      )
      .then((x) => x.data);
  },
};

export default workExperiencesController;
