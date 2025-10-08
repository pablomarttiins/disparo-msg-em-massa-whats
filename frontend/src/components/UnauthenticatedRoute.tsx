import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component for routes that should only be accessible when not authenticated
const UnauthenticatedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/contatos" replace /> : <Outlet />;
};

export default UnauthenticatedRoute;