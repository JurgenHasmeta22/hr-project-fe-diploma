import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "~/utils/theme";
import TopBar from "~/components/topBar";
import PrivateRoutes from "~/utils/PrivateRoutes";
import { DrawerProvider } from "~/components/drawer/drawerContext";
import { ModalProvider } from "~/components/modal/modalContext";
import { useStore } from "~/store/zustand/store";
import { useEffect } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/users";
import Sidebar from "~/components/sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Dashboard = React.lazy(() => import("~/pages/dashboard"));
const Permissions = React.lazy(() => import("~/pages/permissions"));
const Users = React.lazy(() => import("~/pages/users"));
const Login = React.lazy(() => import("~/pages/login"));
const Projects = React.lazy(() => import("~/pages/projects"));
const PermissionReservation = React.lazy(() => import("~/pages/permissionReservation"));
const Error = React.lazy(() => import("~/pages/error"));
const Project = React.lazy(() => import("~/pages/project"));
const User = React.lazy(() => import("~/pages/user"));
const CreateUser = React.lazy(() => import("~/pages/createUser"));
const CreateProject = React.lazy(() => import("~/pages/createProject"));
const Profile = React.lazy(() => import("~/pages/profile"));
const ChangePassword = React.lazy(() => import("~/pages/changePassword"));

const sidebarItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: <HomeOutlinedIcon />,
        index: 0,
    },
    {
        label: "Perdoruesit",
        to: "/users",
        icon: <PeopleOutlinedIcon />,
        index: 1,
    },
    {
        label: "Lista e lejeve",
        to: "/permissions",
        icon: <ReceiptOutlinedIcon />,
        index: 2,
    },
    {
        label: "Rezervimi i lejeve",
        to: "/permissionReservation",
        icon: <ReceiptOutlinedIcon />,
        index: 3,
    },
    {
        label: "Projektet",
        to: "/projects",
        icon: <PersonOutlinedIcon />,
        index: 4,
    },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { openSidebar } = useStore();

    return (
        <React.Fragment>
            <CssBaseline />
            <DrawerProvider>
                <ModalProvider>
                    <div className="app">
                        <Grid container>
                            <Grid item xs={12} md={openSidebar ? 3 : 0}>
                                <Sidebar sidebarItems={sidebarItems} />
                            </Grid>
                            <Grid item xs={12} md={openSidebar ? 9 : 12} ml={!openSidebar ? "30px" : 0}>
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
            </DrawerProvider>
        </React.Fragment>
    );
};

const DashboardPage = () => {
    return (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    );
};

const UsersPage = () => {
    return (
        <MainLayout>
            <Users />
        </MainLayout>
    );
};

const PermissionsPage = () => {
    return (
        <MainLayout>
            <Permissions />
        </MainLayout>
    );
};

const ProjectsPage = () => {
    return (
        <MainLayout>
            <Projects />
        </MainLayout>
    );
};

const PermissionReservationPage = () => {
    return (
        <MainLayout>
            <PermissionReservation />
        </MainLayout>
    );
};

const ProjectPage = () => {
    return (
        <MainLayout>
            <Project />
        </MainLayout>
    );
};

const UserPage = () => {
    return (
        <MainLayout>
            <User />
        </MainLayout>
    );
};

const CreateUserPage = () => {
    return (
        <MainLayout>
            <CreateUser />
        </MainLayout>
    );
};

const CreateProjectPage = () => {
    return (
        <MainLayout>
            <CreateProject />
        </MainLayout>
    );
};

const ProfilePage = () => {
    return (
        <MainLayout>
            <Profile />
        </MainLayout>
    );
};

const ChangePasswordPage = () => {
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

const EditProjectPage = () => {
    return (
        <MainLayout>
            <Project />
        </MainLayout>
    );
};

const EditUserPage = () => {
    return (
        <MainLayout>
            <User />
        </MainLayout>
    );
};

function App() {
    const [theme, colorMode] = useMode();
    const { loadUserFromLocalStorage, user, setUserDetailsLoggedIn } = useStore();

    useEffect(() => {
        loadUserFromLocalStorage();
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
                <Routes>
                    <Route index element={<Navigate replace to="/login" />} />
                    <Route path="*" element={<Error />} />
                    <Route path="/login" element={<Login />} />
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
                        <Route path="/changePassword" element={<ChangePasswordPage />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
