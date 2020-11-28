import { Fragment, isVNode, Slots, VNode } from "vue";

export const getSlot = (slots: Slots, name = "default", options = {}) => {
  // TODO 传入VNode时
  let res = slots[name] && slots[name]?.(options);
  return flattenChildren(res);
};
const isValid = (value: any) =>
  value !== undefined && value !== null && value !== "";
export const isEmptyElement = (c: VNode) =>
  c.type === Comment ||
  (c.type === Fragment && c.children?.length === 0) ||
  (c.type === Text && (<string>c.children)?.trim() === "");
const flattenChildren = (children: any, filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children];
  const res: any[] = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) res.push(...flattenChildren(child, filterEmpty));
    else if (child && child.type === Fragment)
      res.push(...flattenChildren(child.children, filterEmpty));
    else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) res.push(child);
      else if (!filterEmpty) res.push(child);
    } else if (isValid(child)) res.push(child);
  });
  return res;
};
