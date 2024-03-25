import { Outlet, Navigate } from "react-router-dom";
import useLocalStorage from "~/hooks/useLocalStorage";

interface UserData {
    token: string;
}

const PrivateRoutes = () => {
    const [userData] = useLocalStorage<UserData>("user");

    return userData && userData.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
