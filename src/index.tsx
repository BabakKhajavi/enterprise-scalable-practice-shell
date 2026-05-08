import React from 'react';
declare global {
  interface Window {
    __brandReady?: Promise<void>;
  }
}
const start = async () => {
  try {
    // Wait for the brand to be preloaded before starting the app
    await window.__brandReady;
  } catch (error) {
    console.error('Brand preload failed before bootstrap:', error);
  }

  await import('./bootstrap');
};

start();
