import axios from 'axios';

const educationController = {
    createEducation: async (educationModel: any) => {
        return await axios
            .post('https://localhost:7006/api/Education', educationModel)
            .then((response) => response.data);
    },
    editEducation: async (educationId: any, educationModel: any) => {
        return await axios
            .put(
                `https://localhost:7006/api/Education/${educationId}`,
                educationModel,
            )
            .then((response) => response.data);
    },
    deleteEducation: async (educationId: any) => {
        return await axios
            .delete(`https://localhost:7006/api/Education/${educationId}`)
            .then((response) => response.data);
    },
    addUserEducation: async (educationId: any, userId: any, userModel: any) => {
        return await axios
            .post(
                `https://localhost:7006/User/AddUserEducation/${userId},${educationId}`,
                userModel,
            )
            .then((response) => response.data);
    },
    editUserEducation: async (
        educationId: any,
        userId: any,
        userModel: any,
    ) => {
        return await axios
            .put(
                `https://localhost:7006/User/UpdateUserEducation/${userId},${educationId}`,
                userModel,
            )
            .then((response) => response.data);
    },
    deleteUserEducation: async (educationId: any, userId: any) => {
        return await axios
            .delete(
                `https://localhost:7006/User/DeleteUserEducation/${userId},${educationId}`,
            )
            .then((response) => response.data);
    },
};

export default educationController;
