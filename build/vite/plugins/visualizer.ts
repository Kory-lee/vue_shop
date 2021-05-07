import type { Plugin } from 'vite';

import visualizer from 'rollup-plugin-visualizer';

function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

export function configVisualizerConfig() {
  if (!isReportMode()) return [];
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as Plugin;
}
