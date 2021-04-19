import { generateColors } from '../../config/themeConfig';
import { tinycolor, mixDarken, mixLighten, viteThemePlugin } from 'vite-plugin-theme';
import type { Plugin } from 'vite';

export function configThemePlugin(isBuild: boolean): Plugin[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });
  const plugin = [
    viteThemePlugin({
      resolveSelector: (s) => {
        s = s.trim();
        switch (s) {
          case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
            return '.ant-steps-item-icon > .ant-steps-icon';
          case '.ant-steps-item-icon > /ant-steps-icon':
            return s;
        }
        return `[data-theme] ${s}`;
      },
      colorVariables: [],
    }),
  ];
  return (plugin as unknown) as Plugin[];
}
