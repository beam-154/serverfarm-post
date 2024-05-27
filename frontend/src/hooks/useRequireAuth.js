import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function useRequireAuth() {
  const navigate = useNavigate();

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated;
}

export default useRequireAuth;
