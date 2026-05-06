import React, { FC, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  styled,
  useMediaQuery,
  useTheme,
  Theme,
  CSSObject,
} from '@mui/material';
import { GlobalAppBar } from './components/appbar';
import MuiDrawer from '@mui/material/Drawer';
import { GlobalSidebar } from './components/sidebar';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  p: 1,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const AuthenticatedLayout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isPinned, setIsPinned] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const expanded = isPinned || isHovering;
  const isDrawerOpen = isMobile ? isPinned : expanded;
  console.log('isDrawerOpen:', isDrawerOpen);
  const toggleSidebar = useCallback(() => {
    setIsPinned((prev) => !prev);
    setIsHovering(false);
  }, []);

  const handleHoverChange = useCallback(
    (nextHover: boolean) => {
      if (isPinned) {
        return;
      }

      setIsHovering(nextHover);
    },
    [isPinned],
  );
  return (
    <Wrapper>
      <GlobalAppBar
        toggleSidebar={toggleSidebar}
        open={!isMobile && expanded}
        isOverlay={isMobile}
      />
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isDrawerOpen}
        onClose={isMobile ? toggleSidebar : undefined}
        ModalProps={isMobile ? { keepMounted: true } : undefined}
        onMouseEnter={
          !isMobile && !isPinned ? () => handleHoverChange(true) : undefined
        }
        onMouseLeave={
          !isMobile && !isPinned ? () => handleHoverChange(false) : undefined
        }
      >
        <GlobalSidebar expanded={expanded} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Box>
    </Wrapper>
  );
};
