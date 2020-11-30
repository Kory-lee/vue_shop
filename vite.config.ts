import { resolve } from 'path';
import { UserConfig } from 'vite';
const pathResolve = (dir: string): string => resolve(__dirname, dir);

const config: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  // port: VITE_PORT,
  alias: { '/@/': pathResolve('src') },
  // 解决@ant-design无法单独引入，引入全部导致页面卡死的困境
  optimizeDeps: { include: ['@ant-design/icons-vue'] },
};
export default config;
