export function getConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOBAL_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
}

export default getConfigFileName;
