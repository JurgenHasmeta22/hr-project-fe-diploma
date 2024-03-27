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

const AppRoutes = () => {
    return (
        <Routes>
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
            <Route path="/changePassword" element={<ChangePasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route index element={<Navigate replace to="/login" />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
