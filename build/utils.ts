import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';

export function wrapperEnv(envConfig: any): ViteEnv {
  const ret: any = [];
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    else if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (e) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// get the environment variable starting with the specified prefix
export function getEnvConfig(match = 'VITE_GLOBAL', configFiles = ['.env', '.env.production']) {
  let envConfig = {};
  configFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch {}
  });
  Object.keys(envConfig).forEach((key) => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) Reflect.deleteProperty(envConfig, key);
  });

  return envConfig;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export function terseCssr(code) {
  const patternSpace = / +/g;
  const patternEnter = /\n+/g;

  const ast = parser.parse(code, {
    sourceType: 'module',
  });

  traverse(ast, {
    TemplateElement(path) {
      ['raw', 'cooked'].forEach((type) => {
        path.node.value[type] = path.node.value[type]
          .replace(patternSpace, '')
          .replace(patternEnter, '\n');
      });
    },
  });
  return generator(ast).code;
}
