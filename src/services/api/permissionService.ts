import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const permissionService = {
    askPermission: async (model: any, id: string) => {
        return await axios
            .post(`${apiUrl}/User/AssignLejeToUser/${id}`, model)
            .then((response) => response.data);
    },
    approvePermission: async (lejeId: any) => {
        return await axios
            .post(`${apiUrl}/User/ApproveLeje/${lejeId}`, {})
            .then((response) => response.data);
    },
    disapprovePermission: async (lejeId: any) => {
        return await axios
            .post(`${apiUrl}/User/DisapproveLeje/${lejeId}`, {})
            .then((response) => response.data);
    },
    deletePermission: async (lejeId: any) => {
        return await axios
            .delete(`${apiUrl}/User/DeleteLejeOfUser/${lejeId}`)
            .then((response) => response.data);
    },
    updatePermission: async (lejeId: any, model: any) => {
        return await axios
            .put(`${apiUrl}/User/UpdateLeje/${lejeId}`, model)
            .then((response) => response.data);
    },
    getAllPermissions: async () => {
        return await axios.get(`${apiUrl}/Leje/getAllLeje`).then((response) => response.data);
    },
};

export default permissionService;
