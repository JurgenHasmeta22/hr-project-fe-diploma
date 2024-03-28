import { Routes, Route, Navigate } from "react-router-dom";
import {
    ChangePasswordPage,
    CreateProjectPage,
    CreateUserPage,
    DashboardPage,
    EditProjectPage,
    EditUserPage,
    PermissionReservationPage,
    PermissionsPage,
    ProfilePage,
    ProjectPage,
    ProjectsPage,
    UserPage,
    UsersPage,
    ErrorPage,
    LoginPage,
} from "~/app/App";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate replace to="/login" />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/changePassword" element={<ChangePasswordPage />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/permissions" element={<PermissionsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/permissionReservation" element={<PermissionReservationPage />} />
                <Route path="/editProject" element={<EditProjectPage />} />
                <Route path="/editUser" element={<EditUserPage />} />
                <Route path="/addUser" element={<CreateUserPage />} />
                <Route path="/addProject" element={<CreateProjectPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
