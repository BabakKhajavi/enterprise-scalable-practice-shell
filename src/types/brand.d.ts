import type { Brand } from './brand';

declare global {
  interface Window {
    __brandConfig?: Brand;
    __brandSlug?: string;
    __brandReady?: Promise<void>;
    __POWERED_BY_SHELL__?: boolean;
  }
}

export {};
