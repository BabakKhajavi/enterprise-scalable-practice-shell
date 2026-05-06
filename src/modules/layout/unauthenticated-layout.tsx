import React, { FC, Suspense, useCallback, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Stack, styled, useMediaQuery, useTheme } from '@mui/material';

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.background.default,
}));

interface GlobalHeaderProps {
  isSignedIn?: boolean;
}

export const UnAuthenticatedLayout: FC<GlobalHeaderProps> = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
