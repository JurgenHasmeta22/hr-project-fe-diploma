import axios from 'axios';

const usersController = {
	getAllUsers: async () => {
		return await axios.get('https://localhost:7006/User/getAllUsers').then((x) => x.data);
	}
};

export default usersController;
