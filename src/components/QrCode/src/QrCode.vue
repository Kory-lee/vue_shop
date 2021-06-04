<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watchEffect } from 'vue-demi';
  import type { PropType } from 'vue';
  import { LogoType } from './types';
  import { ref, unref } from 'vue';
  import { toCanvas, toDataURL } from 'qrcode';

  export default defineComponent({
    name: 'QrCode',
    props: {
      value: {
        type: [String, Array] as PropType<string | any[]>,
        default: null,
      },
      width: {
        type: Number as PropType<number>,
        default: 200,
      },
      logo: {
        type: [String, Object] as PropType<Partial<LogoType> | string>,
        default: '',
      },
      tag: {
        type: [String, Object] as PropType<Partial<LogoType> | string>,
        default: 'canvas',
        validator: (v: string) => ['canvas', 'img'].includes(v),
      },
    },
    emits: { done: (data) => !!data, error: (error: any) => !!error },
    setup(props, { emit }) {
      const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null);

      async function createQrcode() {
        try {
          const { tag, value, options = {}, width, logo } = props;
          const renderValue = String(value),
            wrapEl = unref(wrapRef);
          if (!wrapEl) return;
          if (tag === 'canvas') {
            const url: string = await toCanvas({
              canvas: wrapEl,
              width,
              logo,
              content: renderValue,
              options,
            });
            emit('done', { url, ctx: wrapEl.getContext('2d') });
            return;
          }

          if (tag === 'img') {
            const url = await toDataURL(renderValue, {
              errorCorrectionLevel: 'H',
              width,
              ...options,
            });
            (unref(wrapRef) as HTMLImageElement).src = url;
            emit('done', { url });
          }
        } catch (e) {
          emit('error', e);
        }
      }

      watchEffect(() => {
        setTimeout(() => {
          createQrcode();
        }, 30);
      });

      return { wrapRef };
    },
  });
</script>
