import React from 'react';
import { RouteObject } from 'react-router-dom';
import { AppPaths } from '../types/app-path';
import { AuthenticatedLayout } from '../modules';
import { AsyncBoundary } from '../modules/components/async-boundary';
const DashboardAppRoutes = React.lazy(
  () => import('enterprise_dashboard/DashboardApp'),
);

export const authenticatedRoutes: RouteObject[] = [
  {
    path: AppPaths.ROOT,
    element: <AuthenticatedLayout />,
    children: [
      {
        path: `${AppPaths.Dashboard}/*`,
        element: (
          <AsyncBoundary errorFallback="Dashboard App failed to load.">
            <DashboardAppRoutes />
          </AsyncBoundary>
        ),
      },
    ],
  },
];
