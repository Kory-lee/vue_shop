import path from 'path';
const parser = require('@babel/parser');
import traverse from '@babel/traverse';
import generator from '@babel/generator';

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
