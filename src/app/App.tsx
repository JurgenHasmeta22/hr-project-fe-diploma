import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "~/utils/theme";
import Header from "~/components/header";
import PrivateRoutes from "~/utils/PrivateRoutes";
import { DrawerProvider } from "~/components/drawer/drawerContext";
import { ModalProvider } from "~/components/modal/modalContext";
import { useStore } from "~/store/zustand/store";
import { useEffect } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/users";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RightPanel from "~/components/drawer";

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

function App() {
    const [theme, colorMode] = useMode();
    const { loadUserFromLocalStorage, user } = useStore();
    const { setUserDetailsLoggedIn } = useStore();

    const sidebarItems = [
        {
            label: "Dashboard",
            to: "/dashboard",
            icon: <HomeOutlinedIcon />,
        },
        {
            label: "Perdoruesit",
            to: "/users",
            icon: <PeopleOutlinedIcon />,
        },
        {
            label: "Lista e lejeve",
            to: "/permissions",
            icon: <ReceiptOutlinedIcon />,
        },
        {
            label: "Rezervimi i lejeve",
            to: "/permissionReservation",
            icon: <ReceiptOutlinedIcon />,
        },
        {
            label: "Projektet",
            to: "/projects",
            icon: <PersonOutlinedIcon />,
        },
    ];

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
                <CssBaseline />
                <DrawerProvider>
                    <ModalProvider>
                        <div className="app">
                            <Routes>
                                <Route index element={<Navigate replace to="/login" />} />
                                <Route
                                    path="*"
                                    element={
                                        <React.Suspense fallback={<>...</>}>
                                            <Error />
                                        </React.Suspense>
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <React.Suspense fallback={<>...</>}>
                                            <Login />
                                        </React.Suspense>
                                    }
                                />
                                <Route element={<PrivateRoutes />}>
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <Box>
                                                    <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                    <main className="content">
                                                        <Header />
                                                        <Dashboard />
                                                    </main>
                                                </Box>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/users"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <Box sx={{display: "grid", gridTemplateColumns: "250px auto", gap: '20px'}}>
                                                    <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                    <Box>
                                                        <Header />
                                                        <Users />
                                                    </Box>
                                                </Box>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/permissions"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <Permissions />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/projects"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <Projects />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/editProject"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <Project />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/editUser"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <User />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/addUser"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <CreateUser />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/addProject"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <CreateProject />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/permissionReservation"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <RightPanel isSidebar={true} sidebarItems={sidebarItems} />
                                                <main className="content">
                                                    <Header />
                                                    <PermissionReservation />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <main className="content">
                                                    <Header />
                                                    <Profile />
                                                </main>
                                            </React.Suspense>
                                        }
                                    />
                                    <Route
                                        path="/changePassword"
                                        element={
                                            <React.Suspense fallback={<>...</>}>
                                                <ChangePassword />
                                            </React.Suspense>
                                        }
                                    />
                                </Route>
                            </Routes>
                        </div>
                    </ModalProvider>
                </DrawerProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
