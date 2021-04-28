import styleImport from 'vite-plugin-style-import';

export default function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return [];
  return styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        resolveComponent: (name) => `ant-design-vue/es/${name}/index`,
      },
    ],
  });
}
