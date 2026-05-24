import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { Brand } from '../types/brand';

export type brandConfig = ThemeOptions;

export function createAppTheme(tenantBrand: Brand): Theme {
  return createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#F5F5F5',
        paper: '#FFFFFF',
      },
      primary: {
        main: tenantBrand.colors.primary,
        text: tenantBrand.colors.primaryText,
        loader: tenantBrand.colors.primaryLoader,
        hover: tenantBrand.colors.primaryHover,
        disabled: tenantBrand.colors.primaryDisabled,
        contrastText: tenantBrand.colors.primaryContrastText,
        selectedBg: tenantBrand.colors.primarySelectBg,
        iconDefault: tenantBrand.colors.iconDefault,
        iconDark: tenantBrand.colors.iconDark,
      },
      secondary: {
        main: tenantBrand.colors.secondary,
        text: tenantBrand.colors.secondaryText,
        loader: tenantBrand.colors.secondaryLoader,
        hover: tenantBrand.colors.secondaryHover,
        disabled: tenantBrand.colors.secondaryDisabled,
        contrastText: tenantBrand.colors.secondaryContrastText,
        selectedBg: tenantBrand.colors.secondarySelectBg,
        iconDefault: tenantBrand.colors.iconDefault,
        iconDark: tenantBrand.colors.iconDark,
      },

      grey: {
        '50': '#FAFAFA',
        '100': '#F5F5F5',
        '200': '#EAEAEA',
        '300': '#DADADA',
        '400': '#C4C4C4',
        '500': '#AFAFAF',
        '600': '#8C8C8C',
        '700': '#656565',
        '800': '#3A3A3A',
        '900': '#242424',
      },

      custom: {
        divider: {
          dark: tenantBrand.colors.secondary,
          light: tenantBrand.colors.border,
        },
        darkGreen: '#165A50',
        lightGreen: '#f0f9ec',
        darkOrange: '#f78b0f',
        lightOrange: '#FCE9D4',
        darkRed: '#C30000',
        lightRed: '#fce5e5',
        darkViolet: '#8754ec',
        lightViolet: '#eee7fc',
      },

      error: {
        main: '#C30000',
        light: '#ED2E2E',
        dark: '#8A0000',
        contrastText: '#FFFFFF',
      },

      warning: {
        main: '#A9701C',
        light: '#F4B740',
        dark: '#7A5014',
        contrastText: '#FFFFFF',
      },
    },

    typography: {
      fontFamily: tenantBrand.fontFamily,

      h1: {
        fontWeight: 700,
        fontSize: '48px',
        lineHeight: '56px',
      },
      h2: {
        fontWeight: 600,
        fontSize: '36px',
        lineHeight: '44px',
      },
      h3: {
        fontWeight: 600,
        fontSize: '28px',
        lineHeight: '34px',
      },
      h4: {
        fontWeight: 600,
        fontSize: '22px',
        lineHeight: '28px',
      },
      h5: {
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '24px',
      },
      h6: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '22px',
      },

      body1: { fontSize: '15px', lineHeight: '22px' },
      body2: { fontSize: '14px', lineHeight: '20px' },

      button: {
        fontWeight: 600,
        fontSize: '14px',
        textTransform: 'none',
      },
    },
  });
}
