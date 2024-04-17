import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const certificatesController = {
    createCertificate: async (certificateData: any) => {
        return await axios
            .post(`${apiUrl}/api/Certifikate`, certificateData)
            .then((response) => response.data);
    },
    editCertificate: async (certificateId: any, certificateData: any) => {
        return await axios
            .put(`${apiUrl}/api/Certifikate/${certificateId}`, certificateData)
            .then((response) => response.data);
    },
    deleteCertificate: async (certificateId: any) => {
        return await axios
            .delete(`${apiUrl}/api/Certifikate/${certificateId}`)
            .then((response) => response.data);
    },
    addUserCertificate: async (certificateId: any, userId: any, certificateData: any) => {
        return await axios
            .post(`${apiUrl}/User/AddUserCertifikate/${userId},${certificateId}`, certificateData)
            .then((response) => response.data);
    },
    editUserCertificate: async (certificateId: any, userId: any, certificateData: any) => {
        return await axios
            .put(`${apiUrl}/User/UpdateUserCertifikate/${userId},${certificateId}`, certificateData)
            .then((response) => response.data);
    },
    deleteUserCertificate: async (certificateId: any, userId: any) => {
        return await axios
            .delete(`${apiUrl}/User/DeleteUserCertifikate/${userId},${certificateId}`)
            .then((response) => response.data);
    },
};

export default certificatesController;
