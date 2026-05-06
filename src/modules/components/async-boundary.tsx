import React, { FC, ReactNode } from 'react';
import { ErrorBoundary } from '../../errors/ErrorBoundary';

type AsyncBoundaryProps = {
  children: ReactNode;
  errorFallback?: ReactNode;
  loadingFallback?: ReactNode;
};

export const AsyncBoundary: FC<AsyncBoundaryProps> = ({
  children,
  errorFallback = 'Something went wrong.',
  loadingFallback = <div>Loading...</div>,
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={loadingFallback}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};
