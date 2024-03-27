import axios from "axios";

const educationController = {
    createEducation: async (educationModel: any) => {
        return await axios.post("https://localhost:7006/api/Edukim", educationModel).then((response) => response.data);
    },
    editEducation: async (educationId: any, educationModel: any) => {
        return await axios
            .put(`https://localhost:7006/api/Edukim/${educationId}`, educationModel)
            .then((response) => response.data);
    },
    deleteEducation: async (educationId: any) => {
        return await axios.delete(`https://localhost:7006/api/Edukim/${educationId}`).then((response) => response.data);
    },
    addUserEducation: async (educationId: any, userId: any, userModel: any) => {
        return await axios
            .post(`https://localhost:7006/User/AddUserEdukim/${userId},${educationId}`, userModel)
            .then((response) => response.data);
    },
    editUserEducation: async (educationId: any, userId: any, userModel: any) => {
        return await axios
            .put(`https://localhost:7006/User/UpdateUserEdukim/${userId},${educationId}`, userModel)
            .then((response) => response.data);
    },
    deleteUserEducation: async (educationId: any, userId: any) => {
        return await axios
            .delete(`https://localhost:7006/User/DeleteUserEdukim/${userId},${educationId}`)
            .then((response) => response.data);
    },
};

export default educationController;
