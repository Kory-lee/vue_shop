import { findPath } from './treeHelper';
import { Menu } from '/@/router/types';

export function getAllParentPath(treeData: any[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}
