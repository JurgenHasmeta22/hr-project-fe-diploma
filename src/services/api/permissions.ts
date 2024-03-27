import axios from "axios";

const permissionsController = {
    askPermission: async (model: any, id: string) => {
        return await axios.post(`https://localhost:7006/User/AssignLejeToUser/${id}`, model).then((response) => response.data);
    },
    approvePermission: async (lejeId: any) => {
        return await axios.post(`https://localhost:7006/User/ApproveLeje/${lejeId}`, {}).then((response) => response.data);
    },
    disapprovePermission: async (lejeId: any) => {
        return await axios.post(`https://localhost:7006/User/DisapproveLeje/${lejeId}`, {}).then((response) => response.data);
    },
    deletePermission: async (lejeId: any) => {
        return await axios.delete(`https://localhost:7006/User/DeleteLejeOfUser/${lejeId}`).then((response) => response.data);
    },
    updatePermission: async (lejeId: any, model: any) => {
        return await axios.put(`https://localhost:7006/User/UpdateLeje/${lejeId}`, model).then((response) => response.data);
    },
    getAllPermissions: async () => {
        return await axios.get("https://localhost:7006/Leje/getAllLeje").then((response) => response.data);
    },
};

export default permissionsController;
