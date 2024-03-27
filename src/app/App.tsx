import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "~/utils/theme";
import TopBar from "~/components/topBar/TopBar";
import PrivateRoutes from "~/utils/PrivateRoutes";
import { RightPanelProvider } from "~/services/providers/RightPanelContext";
import { ModalProvider } from "~/services/providers/ModalContext";
import { useStore } from "~/store/zustand/store";
import { useEffect } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/api/users";
import Sidebar from "~/components/sidebar/Sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import useLocalStorage from "~/hooks/useLocalStorage";

const Dashboard = React.lazy(() => import("~/pages/dashboard/Dashboard"));
const Permissions = React.lazy(() => import("~/pages/permissions/Permissions"));
const Users = React.lazy(() => import("~/pages/users/Users"));
const Login = React.lazy(() => import("~/pages/login/Login"));
const Projects = React.lazy(() => import("~/pages/projects/Projects"));
const PermissionReservation = React.lazy(() => import("~/pages/permissionReservation/PermissionReservation"));
const Error = React.lazy(() => import("~/pages/error/Error"));
const Project = React.lazy(() => import("~/pages/project/Project"));
const User = React.lazy(() => import("~/pages/user/User"));
const CreateUser = React.lazy(() => import("~/pages/createUser/CreateUser"));
const CreateProject = React.lazy(() => import("~/pages/createProject/CreateProject"));
const Profile = React.lazy(() => import("~/pages/profile/Profile"));
const ChangePassword = React.lazy(() => import("~/pages/changePassword/ChangePassword"));

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
        label: "Lejet",
        icon: <ReceiptOutlinedIcon />,
        index: 2,
        submenu: [
            {
                label: "Lista e lejeve",
                to: "/permissions",
                icon: <ReceiptOutlinedIcon />,
                index: 3,
            },
            {
                label: "Rezervimi i lejeve",
                to: "/permissionReservation",
                icon: <ReceiptOutlinedIcon />,
                index: 4,
            },
        ],
    },
    {
        label: "Projektet",
        to: "/projects",
        icon: <PersonOutlinedIcon />,
        index: 5,
    },
];

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
