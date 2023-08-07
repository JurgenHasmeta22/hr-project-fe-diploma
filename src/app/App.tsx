import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from '~/utils/theme';
import Dashboard from '~/pages/dashboard';
import Invoices from '~/pages/permissions';
import Team from '~/pages/users';
import { Login } from '@mui/icons-material';
import Register from '~/pages/register';
import Form from '~/components/form';
import Sidebar from '~/components/global/Sidebar';
import Topbar from '~/components/global/Topbar';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<Routes>
						<Route index element={<Navigate replace to="/login" />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/admin/dashboard"
							element={
								<>
									<Sidebar />
									<main className="content">
										<Topbar />
										<Dashboard />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/users"
							element={
								<>
									<Sidebar />
									<main className="content">
										<Topbar />
										<Team />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/permissions"
							element={
								<>
									<Sidebar />
									<main className="content">
										<Topbar />
										<Invoices />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/form"
							element={
								<>
									<Sidebar />
									<main className="content">
										<Topbar />
										<Form />
									</main>
								</>
							}
						/>
					</Routes>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
