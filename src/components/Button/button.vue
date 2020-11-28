<script lang="ts">
import type { VNode } from "vue";
import props from "./buttonTypes";
import {
  h,
  Text,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  defineComponent,
  inject,
  onUpdated,
} from "vue";
import { ConfigConsumerProps } from "../config-provider";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { getSlot } from "../_utils/props-utils";
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar: (string: string | null) => boolean = rxTwoCNChar.test.bind(
  rxTwoCNChar
);
export default defineComponent({
  name: "KoButton",
  inheritAttrs: false,
  props,
  setup(props, { attrs, emit, slots }: any) {
    let delayTimeout: number,
      iconCom: any = null;
    const buttonNode = ref<Element | null>(null),
      sLoading = ref<boolean>(!!props.loading),
      hasTwoCNChar = ref(false);
    const data = reactive({
      children: <any[]>[],
      loading: ref(!!props.loading),
      hasTwoCNChar: ref(false),
      icon: ref(undefined),
    });

    const configProvider = inject("configProvider", ConfigConsumerProps);
    const autoInsertSpace = true;

    const getClass = () => {
      const iconType = data.loading ? "loading" : data.icon,
        prefixCls = configProvider.getPrefixCls("btn", props.prefixCls);
      const sizes = { large: "lg", small: "sm", default: "" },
        sizeCls = sizes[props.size];
      return {
        [attrs.class]: !!attrs.class,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${props.type}`]: !!props.type,
        [`${prefixCls}-${props.shape}`]: !!props.shape,
        [`${prefixCls}-${sizeCls}`]: !!sizeCls,
        [`${prefixCls}-icon-only`]: !data.children.length && iconType,
        [`${prefixCls}-loading`]: data.loading,
        [`${prefixCls}-background-ghost`]:
          props.ghost || props.type === "ghost",
        [`${prefixCls}-two-chinese-chars`]:
          hasTwoCNChar.value && autoInsertSpace,
        [`${prefixCls}-block`]: props.block,
      };
    };

    const stop = watch(
      () => props.loading,
      (val: boolean | { delay: number }, preVal) => {
        if (preVal && typeof preVal !== "boolean") clearTimeout(delayTimeout);
        if (val && typeof val !== "boolean" && val.delay)
          delayTimeout = window.setTimeout(
            () => (data.loading = !!val),
            val.delay
          );
        else data.loading = !!val;
      }
    );

    const isNeedInserted = () =>
      data.children.length === 1 && !data.icon && props.type !== "link";

    const fixTwoCNChar = () => {
      if (!buttonNode.value) return;
      const buttonText = buttonNode.value.textContent;
      if (isNeedInserted() && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value) hasTwoCNChar.value = true;
      } else if (hasTwoCNChar.value) hasTwoCNChar.value = false;
    };

    const handleClick = ($event: Event) => {
      if (sLoading.value) return false;
      emit("click", $event);
    };
    const insertSpacer = (child: VNode, needInserted: boolean) => {
      const SPACE = needInserted ? " " : "";
      if (child.type === Text) {
        let text = (<string>child.children).trim();
        if (isTwoCNChar(text)) text = text.split("").join(SPACE);
        return h("span", text);
      }
      return child;
    };
    onMounted(() => fixTwoCNChar());
    onUpdated(() => fixTwoCNChar());
    onBeforeUnmount(() => {
      if (delayTimeout) clearTimeout(delayTimeout);
      stop();
    });
    return () => {
      const children = getSlot(slots);
      data.children = children;
      const kids = children.map((child) =>
        insertSpacer(child, isNeedInserted())
      );

      const classes = getClass();
      console.log(classes);
      const buttonProps = {
        ...attrs,
        class: classes,
        ref: buttonNode,
        onClick: handleClick,
        disabled: props.disabled,
      };
      const iconNode = data.loading ? h(LoadingOutlined) : iconCom;

      if (attrs.href !== undefined)
        return h("a", buttonProps, [iconNode, kids]);
      else
        return h("button", { ...buttonProps, type: props.htmlType }, [
          iconNode,
          kids,
        ]);
    };
    // };
  },
});
</script>

<style lang="less"></style>
