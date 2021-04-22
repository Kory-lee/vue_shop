import { generateColors, getThemeColors } from '../../config/themeConfig';
import {
  tinycolor,
  mixDarken,
  mixLighten,
  viteThemePlugin,
  antdDarkThemePlugin,
} from 'vite-plugin-theme';
import type { Plugin } from 'vite';
import path from 'path';
import { generateModifyVars } from '../../config/generate/modifyVars';

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
          case '.ant-steps-item-icon > .ant-steps-icon':
            return s;
        }
        return `[data-theme] ${s}`;
      },
      colorVariables: [...getThemeColors(), ...colors],
    }),
    antdDarkThemePlugin({
      preloadFiles: [
        path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'),
        path.resolve(process.cwd(), 'src/styles/index.less'),
      ],
      filter: (id) => (isBuild ? !id.endsWith('antd.less') : true),
      darkModifyVars: {
        ...generateModifyVars(true),
        'text-color': '#c9d1d9',
        'text-color-base': '#c9d1d9',
        'component-background': '#151515',
        'border-color-base': '#303030',
        'item-active-bg': '#111b26',
        'app-content-background': 'rbg(255 255 255 / 4%)',
      },
    }),
  ];
  return (plugin as unknown) as Plugin[];
}
