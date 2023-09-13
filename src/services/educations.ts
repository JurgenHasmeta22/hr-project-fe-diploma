import axios from 'axios';

const educationsController = {
  createEducation: async (model: any) => {
    return await axios
      .post('https://localhost:7006/api/Edukim', model)
      .then((x) => x.data);
  },
  editEducation: async (edukimId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/api/Edukim/${edukimId}`, model)
      .then((x) => x.data);
  },
  deleteEducation: async (edukimId: any) => {
    return await axios
      .delete(`https://localhost:7006/api/Edukim/${edukimId}`)
      .then((x) => x.data);
  },
  addUserertificate: async (educationId: any, userId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AddUserEducation/${educationId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  editUserEducation: async (educationId: any, userId: any, model: any) => {
    return await axios
      .put(
        `https://localhost:7006/User/UpdateUserEducation/${educationId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteUserEducation: async (educationId: any, userId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteUserEducation/${educationId},${userId}`
      )
      .then((x) => x.data);
  },
};

export default educationsController;
