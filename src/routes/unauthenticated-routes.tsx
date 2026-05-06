import React from 'react';
import { RouteObject } from 'react-router-dom';
import { AsyncBoundary } from '../modules/components/async-boundary';
const AuthAppRoutes = React.lazy(() => import('enterprise_auth/AuthApp'));
export const unauthenticatedRoutes: RouteObject[] = [
  {
    path: '*',
    element: (
      <AsyncBoundary errorFallback="Auth App failed to load.">
        <AuthAppRoutes />
      </AsyncBoundary>
    ),
  },
];
