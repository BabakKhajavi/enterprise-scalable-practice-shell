import React, { useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useBrand } from '../hooks';
import { createAppTheme } from '../theme/createAppTheme';
import { Brand } from '../types/brand';
const fallbackBrand: Brand = {
  tenantId: '01DEFAULTTENANTID',
  favIconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_Icon_Favicon.png',
  smallLogoUrl:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64',

  slug: 'default',
  createdAt: 1775998909360,
  modifiedBy: 'admin@example.com',
  fontFamily: 'Montserrat, Arial, sans-serif',
  modifiedAt: 1776030448402,
  colors: {
    border: '#F3C1E6',
    iconDefault: '#D72660',
    primaryText: '#3D003D',
    primaryDisabled: '#F8D6EC',
    secondaryContrastText: '#FFFFFF',
    primaryHover: '#B8005C',
    bgDefault: '#FFF0FA',
    secondaryText: '#FFFFFF',
    secondary: '#A1005B',
    primaryContrastText: '#FFFFFF',
    secondarySelectBg: '#F3C1E6',
    iconDark: '#7A004C',
    primaryLoader: '#FF4F9D',
    secondaryDisabled: '#F3C1E6',
    primarySelectBg: '#FFD6F5',
    primary: '#D72660',
    secondaryLoader: '#FF4F9D',
    secondaryHover: '#B8005C',
  },
  brandId: '01DEFAULTBRANDID',
  logoUrl:
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=100',
};
type Props = {
  children: React.ReactNode;
};

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const { brand: brandFromRxjs } = useBrand();

  const brand = useMemo(() => {
    return brandFromRxjs ?? window.__brandConfig ?? fallbackBrand;
  }, [brandFromRxjs]);

  const muiTheme = useMemo(() => {
    return createAppTheme(brand as Brand);
  }, [brand]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
