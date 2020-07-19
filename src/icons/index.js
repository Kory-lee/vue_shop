// require.context, 读取指定目录的所有文件
// 目录，是否遍历子目录，定义遍历子目录
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);

export default function install(Vue) {
  Vue.component('svg-icon', () => import('./SvgIcons'));
}
