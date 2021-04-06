import { VitePWA } from 'vite-plugin-pwa';

export default function configPwaConfig(env: ViteEnv) {
  const { VITE_USE_PWA, VITE_GLOBAL_APP_TITLE, VITE_GLOBAL_APP_SHORT_NAME } = env;

  if (VITE_USE_PWA) {
    const pwaConfig = VitePWA({
      manifest: {
        name: VITE_GLOBAL_APP_TITLE,
        short_name: VITE_GLOBAL_APP_SHORT_NAME,
        icons: [
          { src: './resource/img/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: './resource/img/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    });
    return pwaConfig;
  }
  return [];
}
