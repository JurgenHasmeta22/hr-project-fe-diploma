import axios from "axios";

const usersController = {
    getAllUsers: async () => {
        return await axios.get("https://localhost:7006/User/getAllUsers").then((response) => response.data);
    },
    getUser: async (userId: any) => {
        return await axios.get(`https://localhost:7006/User/${userId}`).then((response) => response.data);
    },
    updateUser: async (userId: any, model: any) => {
        return await axios.put(`https://localhost:7006/User/${userId}`, model).then((response) => response.data);
    },
};

export default usersController;
