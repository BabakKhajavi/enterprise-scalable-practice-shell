declare global {
  interface Window {
    __themeConfig?: import('./brand').Brand;
    __brandConfig?: import('./brand').Brand;
    __brandSlug?: string;
    __brandReady?: Promise<void>;
    __POWERED_BY_SHELL__?: boolean;
  }
}

export {};
