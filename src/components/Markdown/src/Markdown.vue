<template>
  <div ref="wrapRef"></div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    ref,
    unref,
    watch,
  } from 'vue-demi';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { getIsDarkMode } from '/@/hooks/setting/useRootSetting';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActived';
  import { getLocale } from '/@/hooks/setting/useLocaleSetting';

  const getVditorTheme = (isDark = false) => (isDark ? 'dark' : 'classic');

  export default defineComponent({
    name: 'Markdown',
    inheritAttrs: false,
    props: {
      height: { type: Number, default: 360 },
      value: { type: String, default: '' },
    },
    emits: ['change', 'input', 'get', 'update:value'],
    setup(props, { emit, attrs }) {
      const wrapRef = ref<ElRef>(null);
      const vditorRef = ref<Nullable<Vditor>>(null);
      const valueRef = ref(props.value || '');
      const initedRef = ref(false);

      const getCurrentLang = computed(() => {
        switch (getLocale.value) {
          case 'en':
            return 'en_US';
          case 'ja':
            return 'ja_JP';
          case 'ko':
            return 'ko_KR';
          default:
            return 'zh_CN';
        }
      });

      watch(
        [getIsDarkMode, initedRef],
        ([isDark, inited]) => {
          if (!inited) return;
          const theme = getVditorTheme(isDark);
          vditorRef.value?.setTheme(theme);
        },
        {
          immediate: true,
          flush: 'post',
        }
      );

      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            vditorRef.value?.setValue?.(v);
          }
          valueRef.value = v;
        }
      );
      const getVidtor = () => vditorRef.value;
      function init() {
        const wrapEl = unref(wrapRef);
        if (!wrapEl) return;
        const bindValue = { ...attrs, ...props };
        const insEditor = new Vditor(wrapEl, {
          theme: getVditorTheme(getIsDarkMode.value),
          lang: unref(getCurrentLang),
          mode: 'sv',
          fullscreen: { index: 520 },
          preview: {
            actions: [],
          },
          input: (v) => {
            valueRef.value = v;
            emit('update:value', v);
            emit('change', v);
            emit('input', v);
          },
          after: () => {
            nextTick(() => {
              insEditor.setValue(valueRef.value);
              vditorRef.value = insEditor;
              initedRef.value = true;
              emit('get', { getVidtor });
            });
          },
          cache: { enable: false },
          ...bindValue,
        });
      }

      function destroy() {
        const vditorInstance = unref(vditorRef);
        if (!vditorInstance) return;
        try {
          vditorInstance?.destroy?.();
        } catch {
          vditorRef.value = null;
        }
      }

      onMountedOrActivated(init);
      onBeforeUnmount(destroy);
      onDeactivated(destroy);
      return {
        wrapRef,
        getVidtor,
      };
    },
  });
</script>

<style></style>
