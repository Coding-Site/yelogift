/* eslint-disable @typescript-eslint/no-explicit-any */
// src/global.d.ts
interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
      AppEvents: {
        logPageView: () => void;
      };
      login: (callback: (response: any) => void, options?: { scope: string }) => void;
      api: (path: string, params: { fields: string }, callback: (response: any) => void) => void;
    };
  }
  