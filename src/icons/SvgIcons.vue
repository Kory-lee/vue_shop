<template>
  <!-- <div>{{ msg }}</div> -->
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  name: 'SvgIcon',
  props: { iconName: { type: String, required: true }, className: { type: String, default: '' } },
  setup(props) {
    const name = computed(() => `#icon-${props.iconName}`);
    // `svg-icon ${props.iconName} ${props.className ? props.className : ''}`;
    const svgClass = computed(() => ['svg-icon', props.iconName, props.className]);
    return {
      name,
      svgClass,
    };
  },
};
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  &.small {
    font-size: $smallFont;
  }
  &.medium {
    font-size: $mediumFont;
  }
  &.regular {
    font-size: $regularFont;
  }
}
</style>
