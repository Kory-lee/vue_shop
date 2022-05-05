import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export function wrapperEnv(envConfig: any): ViteEnv {
  const ret: any = {};
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    else if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch {
        realName = '';
      }
    }
    ret[envName] = realName;
    switch (typeof realName) {
      case 'string':
        process.env[envName] = realName;
        break;
      case 'object':
        process.env[envName] = JSON.stringify(realName);
        break;
    }
  }
  return ret;
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

// get the environment variable starting with the specified prefix
export function getEnvConfig(match = 'VITE_GLOBAL_', configFiles = getConfFiles()) {
  let envConfig = {};
  configFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch {}
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) Reflect.deleteProperty(envConfig, key);
  });

  return envConfig;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
