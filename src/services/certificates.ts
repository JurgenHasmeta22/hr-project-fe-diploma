import axios from 'axios';

const certificatesController = {
    createCertificate: async (certificateData: any) => {
        return await axios
            .post('https://localhost:7006/api/Certifikate', certificateData)
            .then((response) => response.data);
    },
    editCertificate: async (certificateId: any, certificateData: any) => {
        return await axios
            .put(
                `https://localhost:7006/api/Certifikate/${certificateId}`,
                certificateData,
            )
            .then((response) => response.data);
    },
    deleteCertificate: async (certificateId: any) => {
        return await axios
            .delete(`https://localhost:7006/api/Certifikate/${certificateId}`)
            .then((response) => response.data);
    },
    addUserCertificate: async (
        certificateId: any,
        userId: any,
        certificateData: any,
    ) => {
        return await axios
            .post(
                `https://localhost:7006/User/AddUserCertifikate/${userId},${certificateId}`,
                certificateData,
            )
            .then((response) => response.data);
    },
    editUserCertificate: async (
        certificateId: any,
        userId: any,
        certificateData: any,
    ) => {
        return await axios
            .put(
                `https://localhost:7006/User/UpdateUserCertifikate/${userId},${certificateId}`,
                certificateData,
            )
            .then((response) => response.data);
    },
    deleteUserCertificate: async (certificateId: any, userId: any) => {
        return await axios
            .delete(
                `https://localhost:7006/User/DeleteUserCertifikate/${userId},${certificateId}`,
            )
            .then((response) => response.data);
    },
};

export default certificatesController;
