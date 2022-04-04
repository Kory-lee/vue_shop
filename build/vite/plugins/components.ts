import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

export function configComponentsImportPlugin(_isBuild: boolean) {
  if (!_isBuild) return [];
  return [
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
  ];
}
