import type { PropType } from 'vue';

export default {
  startVal: { type: Number, default: 0 },
  endVal: { type: Number, default: 2020 },
  duration: { type: Number, default: 1300 },
  autoplay: { type: Boolean, default: true },
  decimals: {
    type: Number as PropType<number>,
    required: false,
    default: 0,
    validator: (val: number) => val >= 0,
  },
  color: { type: String as PropType<string>, required: false },
  decimal: { type: String, default: '.' },
  separator: { type: String, default: ',' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  useEasing: { type: Boolean, default: true },
  easingFn: {
    type: Function as PropType<(t: number, b: number, c: number, d: number) => number>,
    default: (t: number, b: number, c: number, d: number) =>
      (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b,
  },
};
