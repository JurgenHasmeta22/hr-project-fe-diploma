import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const skillService = {
    createSkill: async (skillModel: any) => {
        return await axios
            .post(`${apiUrl}/api/Aftesi`, skillModel)
            .then((response) => response.data);
    },
    editSkill: async (aftesiId: any, skillModel: any) => {
        return await axios
            .put(`${apiUrl}/api/Aftesi/${aftesiId}`, skillModel)
            .then((response) => response.data);
    },
    deleteSkill: async (aftesiId: any) => {
        return await axios
            .delete(`${apiUrl}/api/Aftesi/${aftesiId}`)
            .then((response) => response.data);
    },
    addUserSkill: async (aftesiId: any, userId: any, skillModel: any) => {
        return await axios
            .post(`${apiUrl}/User/AddUserAftesi/${userId},${aftesiId}`, skillModel)
            .then((response) => response.data);
    },
    editUserSkill: async (aftesiId: any, userId: any, skillModel: any) => {
        return await axios
            .put(`${apiUrl}/User/UpdateUserAftesi/${userId},${aftesiId}`, skillModel)
            .then((response) => response.data);
    },
    deleteUserSkill: async (aftesiId: any, userId: any) => {
        return await axios
            .delete(`${apiUrl}/User/DeleteUserAftesi/${userId},${aftesiId}`)
            .then((response) => response.data);
    },
};

export default skillService;
