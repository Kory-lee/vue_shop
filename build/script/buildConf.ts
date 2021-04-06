/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import { GLOBAL_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import fs, { writeFileSync } from 'fs-extra';
import { getEnvConfig, getRootPath } from '../utils';
import chalk from 'chalk';
import pkg from '../../package.json';
import getConfigFileName from '../getConfigFileName';

function createConfig(
  { configName, config, configFileName = GLOBAL_CONFIG_FILE_NAME } = { configName: '', config: {} }
) {
  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false
      });
    `.replace(/\s/g, '');

    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (err) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + err));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configName = getConfigFileName(config);
  createConfig({ config, configName });
}
