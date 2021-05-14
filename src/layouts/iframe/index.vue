<template>
  <div v-if="showFrame">
    <template v-for="frame of getFramePages" :key="frame.path">
      <IFrame
        v-if="frame.meta.frameSrc && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frame-src="frame.meta.frameSrc"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import { unref } from 'vue';
  import IFrame from '/@/components/IFrame';
  import useFrameKeepAlive from './useFrameKeepAlive';

  export default defineComponent({
    name: 'FrameLayout',
    components: { IFrame },
    setup() {
      const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();

      const showFrame = computed(() => unref(getFramePages).length > 0);
      return { showFrame, showIframe, hasRenderFrame, getFramePages };
    },
  });
</script>
