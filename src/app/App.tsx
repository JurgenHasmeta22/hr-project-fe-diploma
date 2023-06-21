import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
const Error404 = React.lazy(() => import('~/pages/error'));
const Home = React.lazy(() => import('~/pages/home'));
const Login = React.lazy(() => import('~/pages/login'));
import './App.css';
// import AppNavigate from './AppNavigate';

function App() {
	return (
		<>
			{/* <AppNavigate /> */}
			<Routes>
				<Route index element={<Navigate replace to="/login" />} />
				<Route
					path="*"
					element={
						<React.Suspense fallback={<>...</>}>
							<Error404 />
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
				<Route
					path="/home"
					element={
						<React.Suspense fallback={<>...</>}>
							<Home />
						</React.Suspense>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
