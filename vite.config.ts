import { resolve } from "path";
import { UserConfig } from "vite";
const pathResolve = (dir: string): string => resolve(__dirname, dir);

const config: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  // port: VITE_PORT,
  alias: { "/@/": pathResolve("src") },
};
export default config;
