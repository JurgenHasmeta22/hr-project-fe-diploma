import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from '~/utils/theme';
const Dashboard = React.lazy(() => import('~/pages/dashboard'));
const Permissions = React.lazy(() => import('~/pages/permissions'));
const Users = React.lazy(() => import('~/pages/users'));
const Login = React.lazy(() => import('~/pages/login'));
const Projects = React.lazy(() => import('~/pages/projects'));
const PermissionReservation = React.lazy(() => import('~/pages/permissionReservation'));
const Error = React.lazy(() => import('~/pages/error'));
const Project = React.lazy(() => import('~/pages/project'));
const User = React.lazy(() => import('~/pages/user'));
const CreateUser = React.lazy(() => import('~/pages/createUser'));
const CreateProject = React.lazy(() => import('~/pages/createProject'));
const Profile = React.lazy(() => import('~/pages/profile'));
const ChangePassword = React.lazy(() => import('~/pages/changePassword'));
import Sidebar from '~/components/global/Sidebar';
import Topbar from '~/components/global/Topbar';
import PrivateRoutes from '~/utils/PrivateRoutes';
import { DrawerProvider } from '~/components/drawer/drawerContext';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<DrawerProvider>
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
											<Sidebar />
											<main className="content">
												<Topbar />
												<Dashboard />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/users"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<Users />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/permissions"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<Permissions />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/projects"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<Projects />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/editProject"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<Project />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/editUser"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<User />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/addUser"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<CreateUser />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/addProject"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
												<CreateProject />
											</main>
										</React.Suspense>
									}
								/>
								<Route
									path="/permissionReservation"
									element={
										<React.Suspense fallback={<>...</>}>
											<Sidebar />
											<main className="content">
												<Topbar />
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
												<Topbar />
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
				</DrawerProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
