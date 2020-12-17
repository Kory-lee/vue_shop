<script lang="ts">
import { computed, defineComponent, h, nextTick, onMounted, ref, unref } from 'vue';
import Iconify from '@purge-icons/generated';
export default defineComponent({
  name: 'Icon',
  props: {
    icon: { type: String },
    color: { type: String },
    size: {
      type: [String, Number],
      default: 16,
    },
    prefix: { type: String, default: '' },
  },
  setup(props) {
    // const data
    const elRef = ref<ElRef>(null);
    const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`);
    const update = async () => {
      const el = unref(elRef);
      console.log(el);

      if (el) {
        await nextTick();
        const icon = unref(getIconRef);
        const svg = Iconify.renderSVG(icon, {});

        if (svg) {
          el.textContent = '';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      }
    };
    onMounted(update);
    return () => h('span', { ref: elRef });
  },
});
</script>

<style></style>
