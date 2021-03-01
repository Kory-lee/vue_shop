import { defineConfig } from 'vite-plugin-windicss';
import colors from 'windicss/colors';
import lineClamp from 'windicss/plugin/line-clamp';

export default defineConfig({
  darkMode: 'class',
  plugins: [lineClamp, createEnterPlugin()],
  theme: {
    extend: {
      colors,
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
});

function createEnterPlugin(maxOutput = 10) {
  const createCss = (index: number, d: 'x' | 'y' = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: { transform: `translate${upd}(50px)` },
      [`*> .-enter-${d}:nth-child(${index})`]: { transform: `translate${upd}(-50px)` },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        /** name duration timing-function fill-mode delay*/
        animation: `enter-${d}-animation 0.4s ease-in-out forwards ${(index * 1) / 10}s`,
        // 'animation-fill-mode': 'forwards',
        // 'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };

  const handler = ({ addBase }) => {
    const addRawCss = {};

    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: { opacity: '1', transform: 'translateX(0)' },
      },
      [`@keyframes enter-y-animation`]: {
        to: { opacity: '1', transform: 'translateY(0)' },
      },
    });
  };
  return { handler };
}
