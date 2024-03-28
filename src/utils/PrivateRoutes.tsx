import { Outlet, Navigate } from "react-router-dom";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { ReactNode } from "react";

interface UserData {
    token: string;
}

const PrivateRoutes: React.FC = () => {
    const { value } = useLocalStorage("user");
    return value && value.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
