// import type { VNodeChild } from "vue";

export interface BasicButtonProps {
  prefixCls?: String;
  type?: "primary" | "danger" | "dashed" | "ghost" | "default";
  // icon?: VNodeChild | JSX.Element;
  htmlType?: "button" | "submit" | "reset" | "menu";
  shape?: "circle" | "circle-outline";
  size?: "small" | "large" | "default";
  loading?: boolean | { delay: number };
  disabled?: boolean;
  ghost?: boolean;
  block?: boolean;
  onClick?: (e: Event) => void;
}
