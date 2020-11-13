import { resolve } from "path";
import { UserConfig } from "vite";
const pathResolve = (dir: string): string => resolve(__dirname, dir);
const sharedConfig = { alias: { "/@/": pathResolve("src"),"/*/":pathResolve("") } };
const config: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  // port: VITE_PORT,
  ...sharedConfig,
  transforms: [require("vite-transform-globby-import")(sharedConfig)],
};

export default config;
