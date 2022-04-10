import path from 'path';
const parser = require('@babel/parser');
import traverse from '@babel/traverse';
import generator from '@babel/generator';

export function wrapperEnv(envConfig: any) {
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
          .replace(patternSpace, ' ')
          .replace(patternEnter, '\n');
      });
    },
  });
  return generator(ast).code;
}
