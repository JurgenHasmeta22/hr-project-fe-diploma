import axios from "axios";

const skillsController = {
    createSkill: async (skillModel: any) => {
        return await axios.post("https://localhost:7006/api/Aftesi", skillModel).then((response) => response.data);
    },
    editSkill: async (aftesiId: any, skillModel: any) => {
        return await axios.put(`https://localhost:7006/api/Aftesi/${aftesiId}`, skillModel).then((response) => response.data);
    },
    deleteSkill: async (aftesiId: any) => {
        return await axios.delete(`https://localhost:7006/api/Aftesi/${aftesiId}`).then((response) => response.data);
    },
    addUserSkill: async (aftesiId: any, userId: any, skillModel: any) => {
        return await axios
            .post(`https://localhost:7006/User/AddUserAftesi/${userId},${aftesiId}`, skillModel)
            .then((response) => response.data);
    },
    editUserSkill: async (aftesiId: any, userId: any, skillModel: any) => {
        return await axios
            .put(`https://localhost:7006/User/UpdateUserAftesi/${userId},${aftesiId}`, skillModel)
            .then((response) => response.data);
    },
    deleteUserSkill: async (aftesiId: any, userId: any) => {
        return await axios
            .delete(`https://localhost:7006/User/DeleteUserAftesi/${userId},${aftesiId}`)
            .then((response) => response.data);
    },
};

export default skillsController;
