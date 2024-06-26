import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const userService = {
    getAllUsers: async () => {
        return await axios.get(`${apiUrl}/User/getAllUsers`).then((response) => response.data);
    },
    getUser: async (userId: any) => {
        return await axios.get(`${apiUrl}/User/${userId}`).then((response) => response.data);
    },
    updateUser: async (userId: any, model: any) => {
        return await axios.put(`${apiUrl}/User/${userId}`, model).then((response) => response.data);
    },
};

export default userService;
