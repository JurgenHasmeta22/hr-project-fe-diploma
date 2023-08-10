import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from '~/utils/theme';
const Dashboard = React.lazy(() => import('~/pages/dashboard'));
const Permissions = React.lazy(() => import('~/pages/permissions'));
const Users = React.lazy(() => import('~/pages/users'));
const Login = React.lazy(() => import('~/pages/login'));
const Form = React.lazy(() => import('~/components/form'));
const Projects = React.lazy(() => import('~/pages/projects'));
// const Calendar = React.lazy(() => import('~/pages/calendar'));
const Error = React.lazy(() => import('~/pages/error'));
const Project = React.lazy(() => import('~/pages/project'));
const User = React.lazy(() => import('~/pages/user'));
import Sidebar from '~/components/global/Sidebar';
import Topbar from '~/components/global/Topbar';
import PrivateRoutes from '~/utils/PrivateRoutes';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
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
								path="/admin/dashboard"
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
								path="/admin/users"
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
								path="/admin/permissions"
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
								path="/admin/form"
								element={
									<React.Suspense fallback={<>...</>}>
										<Sidebar />
										<main className="content">
											<Topbar />
											<Form />
										</main>
									</React.Suspense>
								}
							/>
							<Route
								path="/admin/form"
								element={
									<React.Suspense fallback={<>...</>}>
										<Sidebar />
										<main className="content">
											<Topbar />
											<Form />
										</main>
									</React.Suspense>
								}
							/>
							<Route
								path="/admin/projects"
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
								path="/admin/editProject"
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
								path="/admin/editUser"
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
						</Route>
					</Routes>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
