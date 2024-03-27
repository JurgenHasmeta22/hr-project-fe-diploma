import axios from "axios";

const workExperiencesController = {
    createWorkExperience: async (model: any) => {
        return await axios.post("https://localhost:7006/api/PervojePune", model).then((response) => response.data);
    },
    editWorkExperience: async (workId: any, model: any) => {
        return await axios.put(`https://localhost:7006/api/PervojePune/${workId}`, model).then((response) => response.data);
    },
    deleteWorkExperience: async (userId: any, workId: any) => {
        return await axios.delete(`https://localhost:7006/api/PervojePune/${workId}`).then((response) => response.data);
    },
    addUserWorkExperience: async (workExperienceId: any, userId: any, model: any) => {
        return await axios
            .post(`https://localhost:7006/User/AddUserPervojePune/${userId},${workExperienceId}`, model)
            .then((response) => response.data);
    },
    editUserWorkExperience: async (workExperienceId: any, userId: any, model: any) => {
        return await axios
            .put(`https://localhost:7006/User/UpdateUserPervojePune/${userId},${workExperienceId}`, model)
            .then((response) => response.data);
    },
    deleteUserWorkExperience: async (workExperienceId: any, userId: any) => {
        return await axios
            .delete(`https://localhost:7006/User/DeleteUserPervojePune/${userId},${workExperienceId}`)
            .then((response) => response.data);
    },
};

export default workExperiencesController;
