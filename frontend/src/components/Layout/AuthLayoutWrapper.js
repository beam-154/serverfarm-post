import Header from './Header';
import useRequiredAuth from '../../hooks/useRequireAuth';
import { Outlet } from 'react-router-dom';

function AuthLayoutWrapper () {
  useRequiredAuth();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayoutWrapper;
