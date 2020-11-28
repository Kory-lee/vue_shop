import type { PropType } from "vue";

export default {
  prefixCls: String,
  type: {
    type: String as PropType<
      "primary" | "default" | "dashed" | "link" | "ghost"
    >,
  },
  htmlType: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  color: String as PropType<"error" | "waring" | "success">,
  size: {
    type: String as PropType<"small" | "large" | "default">,
    default: "default",
  },
  loading: {
    type: [Object, Boolean],
    default: false,
  },
  disabled: Boolean,
  block: Boolean,
  shape: String as PropType<"circle" | "circle-outline" | "round">,
  ghost: Boolean,
  icon: null,
  onClick: Function,
  // throttle: {},
};
