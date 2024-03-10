import axios from "axios";

const authenticationController = {
    onLogin: async (model: any): Promise<any> => {
        const response = await axios.post("https://localhost:7006/api/Account/login", model);
        return response.data;
    },
    onRegister: async (model: any): Promise<any> => {
        const response = await axios.post("https://localhost:7006/api/Account/register", model);
        return response.data;
    },
    onChangePassword: async (model: any): Promise<any> => {
        const response = await axios.patch("https://localhost:7006/api/Account/changePassword", model);
        return response.data;
    },
    updateUser: async (userId: any, model: any): Promise<any> => {
        const response = await axios.put(`https://localhost:7006/User/${userId}`, model);
        return response.data;
    },
    onLogout: () => {
        localStorage.removeItem("token");
    },
};

export default authenticationController;
