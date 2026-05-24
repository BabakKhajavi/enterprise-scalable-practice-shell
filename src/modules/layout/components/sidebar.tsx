import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { OptimizedImage } from 'enterprise_ui/atoms';
import { ChevronDown, ChevronUp, LayoutDashboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme, useMediaQuery } from '@mui/material';
import { AppPaths } from '../../../types/app-path';
import { useBrand } from '../../../hooks';

interface SidebarProps {
  expanded: boolean;
}

type SidebarSubRoutes = Record<string, AppPaths>;
interface SidebarSection {
  label: string;
  items: string[];
  icon: LucideIcon;
  route: AppPaths;
  subRoutes?: SidebarSubRoutes;
}

interface SidebarGroup {
  title: string;
  items: SidebarSection[];
}

export const GlobalSidebar: React.FC<SidebarProps> = ({ expanded }) => {
  const { brand } = useBrand();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const navGroups = React.useMemo<SidebarGroup[]>(
    () => [
      {
        title: 'Dashboard',
        items: [
          {
            label: 'Dashboard',
            items: [] as string[],
            icon: LayoutDashboard,
            route: AppPaths.Dashboard,
          },
        ],
      },
    ],
    [],
  );

  const [openSections, setOpenSections] = React.useState(() =>
    Object.fromEntries(
      navGroups
        .flatMap((group) => group.items)
        .map((section) => [section.label, false]),
    ),
  );
  const [selectedSectionLabel, setSelectedSectionLabel] = React.useState<
    string | null
  >(null);
  const [selectedSubItem, setSelectedSubItem] = React.useState<string | null>(
    null,
  );

  const handleToggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigate = (route: AppPaths) => {
    navigate(route);
  };

  React.useEffect(() => {
    const { pathname } = location;

    let nextSection: string | null = null;
    let nextSubItem: string | null = null;

    navGroups.forEach((group) => {
      group.items.forEach((section) => {
        if (section.subRoutes) {
          Object.entries(section.subRoutes).forEach(([label, route]) => {
            if (pathname === route || pathname.startsWith(`${route}/`)) {
              nextSection = section.label;
              nextSubItem = label;
            }
          });
        } else if (
          pathname === section.route ||
          pathname.startsWith(`${section.route}/`)
        ) {
          nextSection = section.label;
          nextSubItem = null;
        }
      });
    });
    setSelectedSectionLabel(nextSection);
    setSelectedSubItem(nextSubItem);
  }, [location.pathname, navGroups]);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: expanded ? 320 : 84,
        bgcolor: 'background.paper',
        mt: 0,
        pt: 0,
      }}
      component="nav"
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          display: !isMobile ? 'flex' : 'none',
          justifyContent: expanded ? 'flex-start' : 'center',
          alignItems: 'center',
          width: '100%',
          zIndex: 9999,
          pl: expanded ? 1.2 : 0,
          bgcolor: 'background.paper',
          height: 72,
        }}
      >
        <OptimizedImage
          src={expanded ? brand?.logoUrl : brand?.smallLogoUrl}
          alt="Hero"
          height="40px"
          priority="high"
          lazy={true}
        />
      </Box>
      {navGroups.map((group, groupIndex) => (
        <Box key={group.title} sx={{ px: expanded ? 2 : 1 }}>
          {expanded ? (
            <ListSubheader
              component="div"
              sx={{
                top: 72,
                bgcolor: 'background.paper',
                px: 0,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              {group.title}
            </ListSubheader>
          ) : null}
          {group.items.map((section) => {
            const hasItems = section.items.length > 0;
            const isOpen = openSections[section.label];
            const Icon = section.icon;
            const isSelected = selectedSectionLabel === section.label;

            return (
              <React.Fragment key={section.label}>
                <ListItemButton
                  onClick={() => {
                    if (hasItems) {
                      handleToggleSection(section.label);
                      return;
                    }

                    setSelectedSectionLabel(section.label);
                    setSelectedSubItem(null);
                    handleNavigate(section.route);
                  }}
                  aria-label={!expanded ? section.label : undefined}
                  sx={{
                    borderRadius: 2,
                    px: expanded ? 1.5 : 1,
                    py: 1,
                    mb: 0.5,
                    bgcolor: (theme) =>
                      isSelected
                        ? theme.palette.secondary?.main
                        : 'transparent',
                    color: (theme) =>
                      isSelected
                        ? theme.palette.secondary?.contrastText
                        : 'text.primary',
                    justifyContent: expanded ? 'flex-start' : 'center',
                    '&:hover': {
                      bgcolor: (theme) =>
                        isSelected
                          ? theme.palette.secondary?.main
                          : theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: expanded ? 36 : 0,
                      color: (theme) =>
                        isSelected
                          ? theme.palette.secondary?.contrastText
                          : theme.palette.text.secondary,
                    }}
                  >
                    <Icon size={18} />
                  </ListItemIcon>
                  {expanded ? (
                    <ListItemText
                      primary={section.label}
                      primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                    />
                  ) : null}
                  {expanded && hasItems ? (
                    isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </ListItemButton>
                {expanded && hasItems ? (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{ pl: 4.5, pb: 0.5 }}
                    >
                      {section.items.map((item) => {
                        const isSubSelected =
                          selectedSubItem === item &&
                          selectedSectionLabel === section.label;
                        const subRoute = section.subRoutes?.[item];

                        console.log('Rendering sub-item:', subRoute);
                        return (
                          <ListItemButton
                            key={item}
                            onClick={() => {
                              setSelectedSectionLabel(section.label);
                              setSelectedSubItem(item);
                              if (subRoute) {
                                handleNavigate(subRoute);
                              }
                            }}
                            sx={{
                              borderRadius: 2,
                              px: 1.5,
                              py: 0.75,
                              mb: 0.25,
                              color: isSubSelected
                                ? theme.palette.primary?.text
                                : theme.palette.text.primary,
                              bgcolor: isSubSelected
                                ? theme.palette.primary.selectedBg
                                : 'transparent',
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: isSubSelected
                                  ? theme.palette.secondary?.main
                                  : theme.palette.divider,
                                mr: 1.5,
                              }}
                            />
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: 500,
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                ) : null}
              </React.Fragment>
            );
          })}
          {groupIndex < navGroups.length - 1 ? (
            <Divider sx={{ my: 1.5, borderColor: 'divider' }} />
          ) : null}
        </Box>
      ))}
    </List>
  );
};
