import { createStyleImportPlugin } from 'vite-plugin-style-import';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

const ignoreList = ['card-grid', 'card-meta'];
const replaceMap = {
  'typography-text': 'typography',
  'typography-title': 'typography',
  'typography-paragraph': 'typography',
  'typography-link': 'typography',
};

export function configComponentsImportPlugin(_isBuild: boolean) {
  if (!_isBuild) return [];
  return [
    createStyleImportPlugin({
      // resolves: [AndDesignVueResolve()],
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        {
          ensureStyleFile: true,
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            const replacedName = replaceMap[name] || name;
            return ignoreList.includes(name) ? '' : `ant-design-vue/es/${replacedName}/style/index`;
          },
        },
      ],
    }),
    // Components({
    //   resolvers: [AntDesignVueResolver()],
    // }),
  ];
}
