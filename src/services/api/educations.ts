import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const educationController = {
    createEducation: async (educationModel: any) => {
        return await axios.post(`${apiUrl}/api/Edukim`, educationModel).then((response) => response.data);
    },
    editEducation: async (educationId: any, educationModel: any) => {
        return await axios.put(`${apiUrl}/api/Edukim/${educationId}`, educationModel).then((response) => response.data);
    },
    deleteEducation: async (educationId: any) => {
        return await axios.delete(`${apiUrl}/api/Edukim/${educationId}`).then((response) => response.data);
    },
    addUserEducation: async (educationId: any, userId: any, userModel: any) => {
        return await axios
            .post(`${apiUrl}/User/AddUserEdukim/${userId},${educationId}`, userModel)
            .then((response) => response.data);
    },
    editUserEducation: async (educationId: any, userId: any, userModel: any) => {
        return await axios
            .put(`${apiUrl}/User/UpdateUserEdukim/${userId},${educationId}`, userModel)
            .then((response) => response.data);
    },
    deleteUserEducation: async (educationId: any, userId: any) => {
        return await axios.delete(`${apiUrl}/User/DeleteUserEdukim/${userId},${educationId}`).then((response) => response.data);
    },
};

export default educationController;
