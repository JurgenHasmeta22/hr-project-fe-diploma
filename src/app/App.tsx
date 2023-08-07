import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '~/pages/global/Topbar';
import { useMode, ColorModeContext } from '~/utils/theme';
import Sidebar from '~/pages/global/Sidebar';
import Dashboard from '~/pages/dashboard';
import Form from '~/pages/form';
import Invoices from '~/pages/invoices';
import Team from '~/pages/team';
import { Login } from '@mui/icons-material';
import Register from '~/pages/register';

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(true);

	return (
		// @ts-ignore
		<ColorModeContext.Provider value={colorMode}>
			{/* @ts-ignore */}
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
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									<main className="content">
										{/* @ts-ignore */}
										<Topbar setIsSidebar={setIsSidebar} />
										<Dashboard />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/users"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									<main className="content">
										{/* @ts-ignore */}
										<Topbar setIsSidebar={setIsSidebar} />
										<Team />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/permissions"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									<main className="content">
										{/* @ts-ignore */}
										<Topbar setIsSidebar={setIsSidebar} />
										<Invoices />
									</main>
								</>
							}
						/>
						<Route
							path="/admin/form"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									<main className="content">
										{/* @ts-ignore */}
										<Topbar setIsSidebar={setIsSidebar} />
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
