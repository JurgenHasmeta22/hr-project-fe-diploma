import axios from 'axios';

const certificatesController = {
  createCertificate: async (model: any) => {
    return await axios
      .post('https://localhost:7006/api/Certifikate', model)
      .then((x) => x.data);
  },
  editCertificate: async (certificateId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/api/Certifikate/${certificateId}`, model)
      .then((x) => x.data);
  },
  deleteCertificate: async (certificateId: any) => {
    return await axios
      .delete(`https://localhost:7006/api/Certifikate/${certificateId}`)
      .then((x) => x.data);
  },
  addUserertificate: async (certificateId: any, userId: any, model: any) => {
    return await axios
      .post(
        `https://localhost:7006/User/AddUserCertifikate/${certificateId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  editUserCertificate: async (certificateId: any, userId: any, model: any) => {
    return await axios
      .put(
        `https://localhost:7006/User/UpdateUserCertifikate/${certificateId},${userId}`,
        model
      )
      .then((x) => x.data);
  },
  deleteUserCertificate: async (certificateId: any, userId: any) => {
    return await axios
      .delete(
        `https://localhost:7006/User/DeleteUserCertifikate/${certificateId},${userId}`
      )
      .then((x) => x.data);
  },
};

export default certificatesController;