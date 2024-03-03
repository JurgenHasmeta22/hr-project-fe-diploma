import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    let currentUser;

    try {
        currentUser = JSON.parse(localStorage.getItem('user')!);
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
    }

    return currentUser && currentUser.token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoutes;
