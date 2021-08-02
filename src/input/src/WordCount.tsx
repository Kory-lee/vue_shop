import { inputInjectionKey } from './interface';
import { defineComponent, inject, unref } from 'vue';

export default defineComponent({
  name: 'InputWordCount',
  setup() {
    const { wordCountRef, maxlengthRef, mergedClsPrefixRef } = inject(inputInjectionKey)!;
    return () => (
      <span class={`${unref(mergedClsPrefixRef)}-input-word-count`}>
        {unref(maxlengthRef) === undefined
          ? unref(wordCountRef)
          : `${unref(wordCountRef)} / ${unref(maxlengthRef)}`}
      </span>
    );
  },
});
