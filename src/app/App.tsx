import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '~/pages/global/Topbar';
import { useMode, ColorModeContext } from '~/utils/theme';
import Sidebar from '~/pages/global/Sidebar';
import Dashboard from '~/pages/dashboard';
import Contacts from '~/pages/contacts';
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
									{/* @ts-ignore */}
									<Topbar setIsSidebar={setIsSidebar} />
									<Dashboard />
								</>
							}
						/>
						<Route
							path="/admin/team"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									{/* @ts-ignore */}
									<Topbar setIsSidebar={setIsSidebar} />
									<Team />
								</>
							}
						/>
						<Route
							path="/admin/contacts"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									{/* @ts-ignore */}
									<Topbar setIsSidebar={setIsSidebar} />
									<Contacts />
								</>
							}
						/>
						<Route
							path="/admin/invoices"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									{/* @ts-ignore */}
									<Topbar setIsSidebar={setIsSidebar} />
									<Invoices />
								</>
							}
						/>
						<Route
							path="/admin/form"
							element={
								<>
									{/* @ts-ignore */}
									<Sidebar isSidebar={isSidebar} />
									{/* @ts-ignore */}
									<Topbar setIsSidebar={setIsSidebar} />
									<Form />
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
