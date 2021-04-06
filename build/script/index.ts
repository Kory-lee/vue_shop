import { runBuildConfig } from './buildConf';
import chalk from 'chalk';
import pkg from '../../package.json';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);
    if (!argvList.includes('disabled-config')) await runBuildConfig();

    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (err) {
    console.log(chalk.red('vite build error:\n' + err));
    process.exit(1);
  }
};

runBuild();
