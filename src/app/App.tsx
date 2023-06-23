import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const Login = React.lazy(() => import('~/pages/login'));

function App() {
	return (
		<>
			<Routes>
				<Route index element={<Navigate replace to="/login" />} />
				<Route
					path="/login"
					element={
						<React.Suspense fallback={<>...</>}>
							<Login />
						</React.Suspense>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
