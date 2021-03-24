import { isArray } from '../is';

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};
const getConfig = (config: Partial<TreeHelperConfig>): TreeHelperConfig =>
  Object.assign({}, DEFAULT_CONFIG, config);

export function listToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { id, children, pid } = getConfig(config),
    nodeMap = new Map(),
    result: T[] = [];

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent.children : result).push(node);
  }
  return result;
}

export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T[] {
  const { children } = getConfig(config),
    result: any[] = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue;
    result.splice(i + 1, 0, ...result[i][children]);
  }
  return result;
}

export function findNode<T = any>(
  tree: any,
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T | null {
  const { children } = getConfig(config),
    list = [...tree];
  for (const node of list) {
    if (func(node)) return node;
    node[children] && list.push(...node[children]);
  }
  return null;
}

export function findNodeAll<T = any>(
  tree: any,
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  const { children } = getConfig(config),
    list = [...tree],
    result: T[] = [];
  for (const node of list) {
    func(node) && result.push(node);
    node[children] && list.push(...node[children]);
  }
  return result;
}

export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  const { children } = getConfig(config),
    listFilter = (list: T[]) =>
      list
        .map((node: any) => ({ ...node }))
        .filter((node) => {
          node[children] = node[children] && listFilter(node[children]);
          return func(node) || node[children]?.length;
        });
  return listFilter(tree);
}

export function forEach<T = any>(
  tree: T[],
  func: (n: T) => any,
  config: Partial<TreeHelperConfig> = {}
) {
  const { children } = getConfig(config),
    list = [...tree];
  for (let i = 0; i < list.length; i++) {
    func(list[i]);
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children]);
  }
}

export function findPath<T = any>(
  tree: any,
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T | T[] | null {
  const { children } = getConfig(config),
    path: T[] = [],
    list = [...tree],
    visitedSet = new Set();
  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      if (func(node)) return path;
    }
  }
  return null;
}

export function findPathAll<T = any>(
  tree: any,
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  const { children } = getConfig(config),
    path: any[] = [],
    list = [...tree],
    result: any[] = [],
    visitedSet = new Set();

  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && node.unshift(...node[children]);
      path.push(node);
      func(node) && result.push([...path]);
    }
  }
  return result;
}

/**
 * @description: Extract tree specified structure
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt));
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren = isArray(data[children]) && data[children].length > 0,
    conversionData = conversion(data) || {};
  if (haveChildren)
    return {
      ...conversionData,
      [children]: data[children].map((i: number) => treeMapEach(i, { children, conversion })),
    };
  else return { ...conversionData };
}
