import styleImport from 'vite-plugin-style-import';

export default function configStyleImportPlugin() {
  return styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
      },
    ],
  });
}
