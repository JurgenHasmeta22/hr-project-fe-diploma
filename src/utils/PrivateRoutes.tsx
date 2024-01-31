import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user')!);
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }
  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
