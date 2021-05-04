<template>
  <span :style="{ color }">
    {{ displayName }}
  </span>
</template>

<script lang="ts">
  import { reactive, defineComponent, watch, unref, toRef } from 'vue';
  import countToProps from './props';
  import { isNumber } from '/@/utils/is';
  import { onMounted } from '@vue/runtime-core';
  import { computed } from 'vue-demi';

  export default defineComponent({
    name: 'CountTo',
    props: countToProps,
    emits: ['mounted', 'callback'],
    setup(props, { emit }) {
      const state = reactive<{
        localStartVal: number;
        printVal: number | null;
        displayName: string;
        paused: boolean;
        localDuration: number | null;
        startTime: number | null;
        timestamp: number | null;
        rAF: any;
        remaining: number | null;
        color: any;
      }>({
        localStartVal: props.startVal,
        displayName: formatNumber(props.startVal),
        printVal: null,
        paused: false,
        localDuration: props.duration,
        startTime: null,
        timestamp: null,
        remaining: null,
        rAF: null,
        color: null,
      });

      const getCountDown = computed(() => props.startVal > props.endVal);

      watch([() => props.startVal, () => props.endVal], () => {
        if (props.autoplay) start();
      });
      watch(
        () => state.displayName,
        (val) => {
          console.log(val);
        }
      );
      onMounted(() => {
        if (props.autoplay) start();
        emit('mounted');
      });
      function start() {
        const { startVal, duration, color } = props;
        state.localStartVal = startVal;
        state.startTime = null;
        state.localDuration = duration;
        state.color = color;
        state.paused = false;
        state.rAF = requestAnimationFrame(count);
      }
      function pauseResume() {
        if (state.paused) {
          resume();
          state.paused = false;
        } else {
          pause();
          state.paused = true;
        }
      }
      function count(timestamp: number) {
        const { useEasing, easingFn, endVal } = props;
        if (!state.startTime) state.startTime = timestamp;
        state.timestamp = timestamp;
        const progress = timestamp - state.startTime;
        state.remaining = state.localDuration - progress;
        if (useEasing) {
          if (unref(getCountDown))
            state.printVal =
              state.localStartVal -
              easingFn(progress, 0, state.localStartVal - endVal, state.localDuration);
          else
            state.printVal = easingFn(
              progress,
              state.localStartVal,
              endVal - state.localStartVal,
              state.localDuration
            );
        } else {
          // if (unref(getCountDown))
          //   state.printVal =
          //     state.localStartVal -
          //     (state.localStartVal - endVal) * (progress / state.localDuration);
          // else
          state.printVal =
            state.localStartVal + (endVal - state.localStartVal) * (progress / state.localDuration);
        }
        if (unref(getCountDown)) state.printVal = state.printVal < endVal ? endVal : state.printVal;
        else state.printVal = state.printVal > endVal ? endVal : state.printVal;
        state.displayName = formatNumber(state.printVal);
        if (progress < state.localDuration) state.rAf = requestAnimationFrame(count);
        else emit('callback');
      }
      function resume() {
        state.startTime = null;
        state.localDuration = +state.remaining;
        state.localStartVal = +state.printVal;
        requestAnimationFrame(count);
      }
      function pause() {
        cancelAnimationFrame(state.rAF);
      }
      function reset() {
        state.startTime = null;
        cancelAnimationFrame(state.rAF);
        state.displayName = formatNumber(props.startVal);
      }
      function formatNumber(num: number | string) {
        const { decimals, decimal, separator, suffix, prefix } = props;
        num = `${Number(num).toFixed(decimals)}`;
        const x = num.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? decimal + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        if (separator && !isNumber(separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + separator + '$2');
          }
        }
        return prefix + x1 + x2 + suffix;
      }
      return { count, reset, pauseResume, start, displayName: toRef(state, 'displayName') };
    },
  });
</script>
