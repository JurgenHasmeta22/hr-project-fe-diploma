import axios from 'axios';

const certificatesController = {
  createCertificate: async (model: any) => {
    return await axios
      .post('https://localhost:7006/api/Certificate', model)
      .then((x) => x.data);
  },
  editCertificate: async (certificateId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/api/Certificate/${certificateId}`, model)
      .then((x) => x.data);
  },
  deleteCertificate: async (certificateId: any) => {
    return await axios
      .delete(`https://localhost:7006/api/Certificate/${certificateId}`)
      .then((x) => x.data);
  },
  addUserertificate: async (certificateId: any, userId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AddUserCertificate/${certificateId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  editUserCertificate: async (certificateId: any, userId: any, model: any) => {
    return await axios
      .put(
        `https://localhost:7006/User/UpdateUserCertificate/${certificateId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteUserCertificate: async (certificateId: any, userId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteUserCertificate/${certificateId},${userId}`
      )
      .then((x) => x.data);
  },
};

export default certificatesController;
