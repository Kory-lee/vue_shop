import html from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOBAL_CONFIG_FILE_NAME } from '../../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOBAL_APP_TITLE, VITE_PUBLIC_PATH } = env,
    path = VITE_PUBLIC_PATH.endsWith('/') ? `${VITE_PUBLIC_PATH}` : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () =>
    `${path || '/'}${GLOBAL_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  return html({
    minify: isBuild,
    inject: {
      data: { title: VITE_GLOBAL_APP_TITLE },
      tags: isBuild ? [{ tag: 'script', attrs: { src: getAppConfigSrc() } }] : [],
    },
  });
}
