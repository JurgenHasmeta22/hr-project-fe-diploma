import axios from 'axios';

const authenticationController = {
    onLogin: async (model: any): Promise<any> => {
        try {
            const response = await axios.post(
                'https://localhost:7006/api/Account/login',
                model,
            );
            return response.data;
        } catch (error) {
            console.error('Error in onLogin:', error);
            throw error;
        }
    },
    onRegister: async (model: any): Promise<any> => {
        try {
            const response = await axios.post(
                'https://localhost:7006/api/Account/register',
                model,
            );
            return response.data;
        } catch (error) {
            console.error('Error in onRegister:', error);
            throw error;
        }
    },
    onChangePassword: async (model: any): Promise<any> => {
        try {
            const response = await axios.patch(
                'https://localhost:7006/api/Account/changePassword',
                model,
            );
            return response.data;
        } catch (error) {
            console.error('Error in onChangePassword:', error);
            throw error;
        }
    },
    updateUser: async (userId: any, model: any): Promise<any> => {
        try {
            const response = await axios.put(
                `https://localhost:7006/User/${userId}`,
                model,
            );
            return response.data;
        } catch (error) {
            console.error('Error in updateUser:', error);
            throw error;
        }
    },
    onLogout: () => {
        localStorage.removeItem('token');
    },
};

export default authenticationController;
