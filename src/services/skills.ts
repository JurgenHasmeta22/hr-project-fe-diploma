import axios from 'axios';

const skillsController = {
  createSkill: async (model: any) => {
    return await axios
      .post('https://localhost:7006/api/Aftesi', model)
      .then((x) => x.data);
  },
  editSkill: async (aftesiId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/api/Aftesi/${aftesiId}`, model)
      .then((x) => x.data);
  },
  deleteSkill: async (aftesiId: any) => {
    return await axios
      .delete(`https://localhost:7006/api/Aftesi/${aftesiId}`)
      .then((x) => x.data);
  },
  addUserertificate: async (aftesiId: any, userId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AddUserAftesi/${userId},${aftesiId}`,
        model
      )
      .then((x) => x.data);
  },
  editUserAftesi: async (aftesiId: any, userId: any, model: any) => {
    return await axios
      .put(
        `https://localhost:7006/User/UpdateUserAftesi/${userId},${aftesiId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteUserAftesi: async (aftesiId: any, userId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteUserAftesi/${userId},${aftesiId}`
      )
      .then((x) => x.data);
  },
};

export default skillsController;
