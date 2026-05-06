import React, { useMemo } from 'react';
import { styled, alpha, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {
  MoreVertical,
  PanelLeft,
  Menu as MenuIcon,
  Search as SearchIcon,
} from 'lucide-react';
import { FC } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Avatar, Divider, Popover } from '@mui/material';
import { Stack } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmailIcon from '@mui/icons-material/Email';
import { OptimizedImage } from 'enterprise_ui/atoms';
import { useTheme, useMediaQuery } from '@mui/material';
import { useBrand } from '../../../hooks';
import { useAuth } from '../../../hooks/use-auth';
import { Brand } from '../../../types/brand';
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isOverlay?: boolean;
}

const miniDrawerWidth = 56; // theme.spacing(7) + 1px
const miniDrawerWidthSm = 65; // theme.spacing(8) + 1px

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open' && prop !== 'isOverlay',
})<AppBarProps>(({ theme, open, isOverlay }: any) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isOverlay
    ? 0
    : open
      ? drawerWidth
      : theme.breakpoints.up('sm')
        ? miniDrawerWidthSm
        : miniDrawerWidth,
  width: isOverlay
    ? '100%'
    : open
      ? `calc(100% - ${drawerWidth}px)`
      : `calc(100% - ${
          theme.breakpoints.up('sm') ? miniDrawerWidthSm : miniDrawerWidth
        }px)`,
  boxShadow: 'none',
}));

const Search = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.default, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.default, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const logoSrc = `${process.env.ENTERPRISE_ASSET_URL}/zaplit-logo-h.webp`;
export const GlobalAppBar: FC<AppBarProps & { toggleSidebar: () => void }> = ({
  open,
  isOverlay,
  toggleSidebar,
}) => {
  const { tenantTheme } = useBrand();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  React.useState<null | HTMLElement>(null);

  const isProfileOpen = Boolean(anchorEl);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const avatar = useMemo(() => {
    if (user?.avatarUrl) {
      return (
        <Avatar
          alt="Remy Sharp"
          src={user.avatarUrl}
          sx={{ width: 36, height: 36 }}
        />
      );
    } else if (user?.firstName && user?.lastName) {
      const initials = user
        ? user?.firstName.charAt(0).toUpperCase() +
          user.lastName.charAt(0).toUpperCase()
        : '';
      return (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.iconDark,
            width: 36,
            height: 36,
          }}
        >
          {initials}
        </Avatar>
      );
    } else {
      return (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.iconDark,
            width: 36,
            height: 36,
          }}
        >
          {user?.email.length > 0
            ? user?.email?.charAt(0).toUpperCase()
            : 'N/A'}
        </Avatar>
      );
    }
  }, [user, theme.palette.primary.iconDark]);
  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Implement mobile menu open logic here
  };
  return (
    <AppBar position="fixed" open={open} isOverlay={isOverlay}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="open drawer"
          sx={{
            color: theme.palette.primary.iconDark,
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
          onClick={toggleSidebar}
        >
          {isMobile ? <MenuIcon size={25} /> : <PanelLeft size={25} />}
        </IconButton>
        <Search sx={{ display: isMobile ? 'none' : 'flex', flexGrow: 1 }}>
          <SearchIconWrapper>
            <SearchIcon size={20} color={theme.palette.primary.iconDark} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box
          sx={{
            display: isMobile ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <OptimizedImage src={tenantTheme?.logoUrl} alt="Hero" height="40px" />
        </Box>
        <Stack
          direction="row"
          spacing={0.3}
          alignItems="center"
          sx={{ display: isMobile ? 'none' : 'flex' }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            onClick={toggleSidebar}
            sx={{ cursor: 'pointer', color: theme.palette.primary.iconDark }}
          >
            <Badge badgeContent={4} color="error">
              <EmailIcon
                sx={{ fontSize: 30, color: theme.palette.primary.iconDark }}
              />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsActiveIcon
                sx={{ fontSize: 30, color: theme.palette.primary.iconDark }}
              />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleOpenProfileMenu}
            color="inherit"
          >
            {avatar}
          </IconButton>
        </Stack>

        <Box
          sx={{
            display: isMobile ? 'flex' : 'none',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 'auto',
          }}
        >
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleOpenProfileMenu}
            color="inherit"
            sx={{
              cursor: 'pointer',
              padding: 0,
              margin: 0,
            }}
          >
            <MoreVertical size={25} />
          </IconButton>
        </Box>
      </Toolbar>
      <Popover
        id="profile-menu"
        open={isProfileOpen}
        anchorEl={anchorEl}
        onClose={handleCloseProfileMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="profile-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isProfileOpen}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseProfileMenu}>My account</MenuItem>
          <Divider />
          <MenuItem onClick={() => signOut(tenantTheme as Brand)}>
            Sign out
          </MenuItem>
        </Menu>
      </Popover>
    </AppBar>
  );
};
