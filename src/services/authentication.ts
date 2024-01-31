import axios from 'axios';

const authenticationController = {
  onLogin: async (model: any): Promise<any> => {
    return await axios
      .post('https://localhost:7006/api/Account/login', model)
      .then((x) => x.data);
  },
  onRegister: async (model: any): Promise<any> => {
    return await axios
      .post('https://localhost:7006/api/Account/register', model)
      .then((x) => x.data);
  },
  onChangePassword: async (model: any): Promise<any> => {
    return await axios
      .patch('https://localhost:7006/api/Account/changePassword', model)
      .then((x) => x.data);
  },
  updateUser: async (userId: any, model: any): Promise<any> => {
    return await axios
      .put(`https://localhost:7006/User/${userId}`, model)
      .then((x) => x.data);
  },
  onLogout: () => {
    localStorage.removeItem('token');
  },
};

export default authenticationController;
