import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const authenticationController = {
    onLogin: async (model: any): Promise<any> => {
        const response = await axios.post(`${apiUrl}/api/Account/login`, model);
        return response.data;
    },
    onRegister: async (model: any): Promise<any> => {
        const response = await axios.post(`${apiUrl}/api/Account/register1`, model);
        return response.data;
    },
    onChangePassword: async (model: any): Promise<any> => {
        const response = await axios.patch(`${apiUrl}/api/Account/changePassword`, model);
        return response.data;
    },
    onLogout: () => {
        localStorage.removeItem("token");
    },
};

export default authenticationController;
