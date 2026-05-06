import { useRoutes } from 'react-router-dom';
import { authenticatedRoutes } from './authenticated-routes';
import { unauthenticatedRoutes } from './unauthenticated-routes';
import { useAuth } from '../hooks/use-auth';
export const AppRoutes = () => {
  const { authState } = useAuth();
  const token = authState?.token || localStorage.getItem('enterprise_token');
  const routes = token ? authenticatedRoutes : unauthenticatedRoutes;
  return useRoutes(routes);
};
