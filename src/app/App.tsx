import * as React from "react";
import { Box, CircularProgress, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "~/utils/theme";
import TopBar from "~/components/topBar/TopBar";
import { RightPanelProvider } from "~/services/providers/RightPanelContext";
import { ModalProvider } from "~/services/providers/ModalContext";
import { useStore } from "~/services/store/store";
import { useEffect, useState } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/api/users";
import Sidebar from "~/components/sidebar/Sidebar";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { sidebarItems } from "~/utils/sidebarItems";
import AppRoutes from "~/utils/Routes";

// #region Lazy Imports pages
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
const Error = React.lazy(() => import("~/pages/error/Error"));
const Login = React.lazy(() => import("~/pages/login/Login"));
// #endregion

// #region Main Layout
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
// #endregion

// #region HOC components for layour wrapping
const withMainLayout = (Component: React.ComponentType) => {
    return (props: any) => {
        return (
            <MainLayout>
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
                    <Component {...props} />
                </React.Suspense>
            </MainLayout>
        );
    };
};

const withSuspenseWithoutMainLayout = (Component: React.ComponentType) => {
    return (props: any) => {
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
                <Component {...props} />
            </React.Suspense>
        );
    };
};
// #endregion

// #region Using HOC to wrap or not wrap the pages
export const DashboardPage = withMainLayout(Dashboard);
export const UsersPage = withMainLayout(Users);
export const PermissionsPage = withMainLayout(Permissions);
export const ProjectsPage = withMainLayout(Projects);
export const PermissionReservationPage = withMainLayout(PermissionReservation);
export const ProjectPage = withMainLayout(Project);
export const UserPage = withMainLayout(User);
export const CreateUserPage = withMainLayout(CreateUser);
export const CreateProjectPage = withMainLayout(CreateProject);
export const ProfilePage = withMainLayout(Profile);
export const EditProjectPage = withMainLayout(Project);
export const EditUserPage = withMainLayout(User);
export const LoginPage = withSuspenseWithoutMainLayout(Login);
export const ChangePasswordPage = withSuspenseWithoutMainLayout(ChangePassword);
export const ErrorPage = withSuspenseWithoutMainLayout(Error);
// #endregion

export interface UserData {
    token: string;
}

function App() {
    const [theme, colorMode] = useMode();
    const { user, setUserDetailsLoggedIn, setUser, setOpenSidebar } = useStore();
    const { value } = useLocalStorage("user");
    const [isPageShrunk, setIsPageShrunk] = useState(false);

    useEffect(() => {
        if (value) {
            setUser(value);
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

    useEffect(() => {
        const handleResize = () => {
            setIsPageShrunk(window.innerWidth < 991);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isPageShrunk) {
            setOpenSidebar(false);
        } else {
            setOpenSidebar(true);
        }
    }, [isPageShrunk]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
