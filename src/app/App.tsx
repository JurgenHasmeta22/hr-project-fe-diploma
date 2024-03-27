import * as React from "react";
import { Box, CircularProgress, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "~/utils/theme";
import TopBar from "~/components/topBar/TopBar";
import { RightPanelProvider } from "~/services/providers/RightPanelContext";
import { ModalProvider } from "~/services/providers/ModalContext";
import { useStore } from "~/services/store/store";
import { useEffect } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/api/users";
import Sidebar from "~/components/sidebar/Sidebar";
import useLocalStorage from "~/hooks/useLocalStorage";
import { sidebarItems } from "~/utils/sidebarItems";
const Dashboard = React.lazy(() => import("~/pages/dashboard/Dashboard"));
const Permissions = React.lazy(() => import("~/pages/permissions/Permissions"));
const Users = React.lazy(() => import("~/pages/users/Users"));
const Projects = React.lazy(() => import("~/pages/projects/Projects"));
const PermissionReservation = React.lazy(() => import("~/pages/permissionReservation/PermissionReservation"));
const Project = React.lazy(() => import("~/pages/project/Project"));
const User = React.lazy(() => import("~/pages/user/User"));
const CreateUser = React.lazy(() => import("~/pages/createUser/CreateUser"));
const CreateProject = React.lazy(() => import("~/pages/createProject/CreateProject"));
const Profile = React.lazy(() => import("~/pages/profile/Profile"));
const ChangePassword = React.lazy(() => import("~/pages/changePassword/ChangePassword"));
export const Error = React.lazy(() => import("~/pages/error/Error"));
export const Login = React.lazy(() => import("~/pages/login/Login"));
import AppRoutes from "~/utils/Routes";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { openSidebar } = useStore();

    return (
        <React.Fragment>
            <CssBaseline />
            <RightPanelProvider>
                <ModalProvider>
                    <div className="app">
                        <Grid container>
                            <Grid item xs={12} md={openSidebar ? 3 : 0}>
                                <Sidebar sidebarItems={sidebarItems} />
                            </Grid>
                            <Grid item xs={12} md={openSidebar ? 9 : 12}>
                                <TopBar />
                                <Box sx={{ margin: "0 auto" }}>
                                    <React.Suspense
                                        fallback={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100vh",
                                                }}
                                            >
                                                <CircularProgress size={80} thickness={4} />
                                            </Box>
                                        }
                                    >
                                        {children}
                                    </React.Suspense>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </ModalProvider>
            </RightPanelProvider>
        </React.Fragment>
    );
};

export const DashboardPage = () => {
    return (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    );
};

export const UsersPage = () => {
    return (
        <MainLayout>
            <Users />
        </MainLayout>
    );
};

export const PermissionsPage = () => {
    return (
        <MainLayout>
            <Permissions />
        </MainLayout>
    );
};

export const ProjectsPage = () => {
    return (
        <MainLayout>
            <Projects />
        </MainLayout>
    );
};

export const PermissionReservationPage = () => {
    return (
        <MainLayout>
            <PermissionReservation />
        </MainLayout>
    );
};

export const ProjectPage = () => {
    return (
        <MainLayout>
            <Project />
        </MainLayout>
    );
};

export const UserPage = () => {
    return (
        <MainLayout>
            <User />
        </MainLayout>
    );
};

export const CreateUserPage = () => {
    return (
        <MainLayout>
            <CreateUser />
        </MainLayout>
    );
};

export const CreateProjectPage = () => {
    return (
        <MainLayout>
            <CreateProject />
        </MainLayout>
    );
};

export const ProfilePage = () => {
    return (
        <MainLayout>
            <Profile />
        </MainLayout>
    );
};

export const ChangePasswordPage = () => {
    return (
        <React.Suspense
            fallback={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress size={80} thickness={4} />
                </Box>
            }
        >
            <ChangePassword />
        </React.Suspense>
    );
};

export const EditProjectPage = () => {
    return (
        <MainLayout>
            <Project />
        </MainLayout>
    );
};

export const EditUserPage = () => {
    return (
        <MainLayout>
            <User />
        </MainLayout>
    );
};

interface UserData {
    token: string;
}

function App() {
    const [theme, colorMode] = useMode();
    const { user, setUserDetailsLoggedIn, setUser } = useStore();
    const [userData] = useLocalStorage<UserData>("user");

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                try {
                    const response: IUser = await usersController.getUser(user.userId);

                    if (response) {
                        setUserDetailsLoggedIn(response);
                    }
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }
        };

        fetchUser();
    }, [user]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
