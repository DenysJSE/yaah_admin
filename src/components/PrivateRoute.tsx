import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogged = !!localStorage.getItem('token');

  return (
    isLogged ? <Outlet /> : <Navigate to={'/'} />
  )
};

export default PrivateRoute;
