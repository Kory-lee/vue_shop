// import type { GlobeEnvConfig } from '/@/types/config';

export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true';
