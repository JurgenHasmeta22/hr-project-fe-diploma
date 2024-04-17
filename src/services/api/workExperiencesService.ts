import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const workExperienceService = {
    createWorkExperience: async (model: any) => {
        return await axios
            .post(`${apiUrl}/api/PervojePune`, model)
            .then((response) => response.data);
    },
    editWorkExperience: async (workId: any, model: any) => {
        return await axios
            .put(`${apiUrl}/api/PervojePune/${workId}`, model)
            .then((response) => response.data);
    },
    deleteWorkExperience: async (userId: any, workId: any) => {
        return await axios
            .delete(`${apiUrl}/api/PervojePune/${workId}`)
            .then((response) => response.data);
    },
    addUserWorkExperience: async (workExperienceId: any, userId: any, model: any) => {
        return await axios
            .post(`${apiUrl}/User/AddUserPervojePune/${userId},${workExperienceId}`, model)
            .then((response) => response.data);
    },
    editUserWorkExperience: async (workExperienceId: any, userId: any, model: any) => {
        return await axios
            .put(`${apiUrl}/User/UpdateUserPervojePune/${userId},${workExperienceId}`, model)
            .then((response) => response.data);
    },
    deleteUserWorkExperience: async (workExperienceId: any, userId: any) => {
        return await axios
            .delete(`${apiUrl}/User/DeleteUserPervojePune/${userId},${workExperienceId}`)
            .then((response) => response.data);
    },
};

export default workExperienceService;
