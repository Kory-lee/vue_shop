<!--<template>
 <button
    ref="buttonNode"
    :class="classes"
    v-bind="$attrs"
    :type="isLink ? null : htmlType"
    v-is="isLink ? 'a' : 'button'"
    :disabled="disabled"
    @click="handleClick"
  >
    <template #[item]="scope" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="scope" />
    </template>
  </button> 
</template>-->

<script lang="ts">
import type { PropType } from "vue";
import {
  h,
  Text,
  computed,
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

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar: (string: string | null) => boolean = rxTwoCNChar.test.bind(
  rxTwoCNChar
);
export default defineComponent({
  name: "KoButton",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    type: {
      type: String as PropType<
        "primary" | "default" | "danger" | "dashed" | "link"
      >,
      default: "default",
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
    disabled: { type: Boolean as PropType<boolean>, default: false },
    block: Boolean,
    shape: String,
    ghost: String,

    // throttle: {},
  },
  setup(props, { attrs, emit, slots }) {
    let delayTimeout: number,
      iconCom: any = null;
    const buttonNode = ref<Element | null>(null),
      sLoading = ref<boolean>(!!props.loading),
      hasTwoCNChar = ref(false);
    const children = reactive([]);
    const configProvider = inject("configProvider", ConfigConsumerProps);
    const prefixClass = computed<string>(() =>
      configProvider.getPrefixCls("btn", props.prefixCls)
    );
    const sizes = { large: "lg", small: "sm", default: "" };
    const autoInsertSpace = false;
    const classes = reactive({
      [`${attrs.class}`]: !!attrs.class,
      [`${prefixClass.value}`]: true,
      [`${prefixClass.value}-${props.type}`]: !!props.type,
      [`${prefixClass.value}-${props.shape}`]: !!props.shape,
      [`${prefixClass.value}-${sizes[props.size]}`]: !!sizes[props.size],
      [`${prefixClass.value}-icon-only`]:
        slots.length === 0 && (sLoading.value ? "loading" : iconCom),
      [`${prefixClass.value}-loading`]: sLoading.value,
      [`${prefixClass.value}-background-ghost`]: props.ghost,
      //  || props.type === "ghost"
      [`${prefixClass.value}-two-chinese-chars`]:
        hasTwoCNChar.value && autoInsertSpace,
      [`${prefixClass.value}-block`]: props.block,
    });

    const stop = watch(
      () => props.loading,
      (val: boolean | { delay: number }, preVal) => {
        if (preVal && typeof preVal !== "boolean") clearTimeout(delayTimeout);
        if (val && typeof val !== "boolean" && val.delay)
          delayTimeout = window.setTimeout(
            () => (sLoading.value = !!val),
            val.delay
          );
        else sLoading.value = !!val;
      }
    );
    const isNeedInserted = () => {
      return children.length === 1 && !iconCom && props.type !== "link";
    };
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
    // TODO
    const insertSpacer = (child: any, needInserted: boolean) => {
      const SPACE = needInserted ? " " : "";
      if (child.type === Text) {
        let text = child.children.trim();
        if (isTwoCNChar(text)) text = text.split("").join(SPACE);
        return h("span", text);
      }
      return child;
    };
    onMounted(() => {
      fixTwoCNChar();
      console.log(slots);
    });
    onUpdated(() => fixTwoCNChar());
    onBeforeUnmount(() => {
      if (delayTimeout) clearTimeout(delayTimeout);
      stop();
    });

    const iconNode = sLoading.value ? h(LoadingOutlined) : iconCom;
    const buttonProps = {
      ...attrs,
      class: classes,
      ref: buttonNode,
      onClick: handleClick,
      disabled: props.disabled,
      type: props.htmlType,
    };
    const kids = "";
    if (attrs.href !== undefined)
      return () =>
        h("a", { ref: buttonNode, onClick: handleClick, class: classes });
    return () =>
      h("button", buttonProps, [
        iconNode,
        insertSpacer((<{ icon: any }>slots).icon()[0], true),
      ]);
  },
});
</script>

<style lang="less"></style>
