import axios from 'axios';

const usersController = {
  getAllUsers: async () => {
    return await axios
      .get('https://localhost:7006/User/getAllUsers')
      .then((x) => x.data);
  },
  getUser: async (userId: any) => {
    return await axios
      .get(`https://localhost:7006/User/${userId}`)
      .then((x) => x.data);
  },
  updateUser: async (userId: any, model: any) => {
    return await axios
      .put(`https://localhost:7006/User/${userId}`, model)
      .then((x) => x.data);
  },
};

export default usersController;
