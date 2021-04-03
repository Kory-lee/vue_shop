export function wrapperEnv(envConfig: any): ViteEnv {
  const ret: any = [];
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    else if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (e) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
