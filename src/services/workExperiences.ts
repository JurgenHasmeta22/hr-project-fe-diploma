import axios from 'axios';

const workExperiencesController = {
    createWorkExpierence: async (model: any) => {
        return await axios
            .post('https://localhost:7006/api/PervojePune', model)
            .then((x) => x.data);
    },
    editWorkExpierence: async (workId: any, model: any) => {
        return await axios
            .put(`https://localhost:7006/api/PervojePune/${workId}`, model)
            .then((x) => x.data);
    },
    deleteWorkExpierence: async (userId: any, workId: any) => {
        return await axios
            .delete(`https://localhost:7006/api/PervojePune/${workId}`)
            .then((x) => x.data);
    },
    addUserWorkExperience: async (
        workExperienceId: any,
        userId: any,
        model: any,
    ) => {
        return await axios
            .post(
                `https://localhost:7006/User/AddUserPervojePune/${userId},${workExperienceId}`,
                model,
            )
            .then((x) => x.data);
    },
    editUserWorkExpierence: async (
        workExperienceId: any,
        userId: any,
        model: any,
    ) => {
        return await axios
            .put(
                `https://localhost:7006/User/UpdateUserPervojePune/${userId},${workExperienceId}`,
                model,
            )
            .then((x) => x.data);
    },
    deleteUserWorkExpierence: async (workExperienceId: any, userId: any) => {
        return await axios
            .delete(
                `https://localhost:7006/User/DeleteUserPervojePune/${userId},${workExperienceId}`,
            )
            .then((x) => x.data);
    },
};

export default workExperiencesController;
