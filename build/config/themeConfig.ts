import { generate } from '@ant-design/colors';

export const primaryColor = '#0960bd';

export const themeMode = 'light';

export type ThemeMode = 'dark' | 'light';

type Fn = (...arg: any) => any;

export interface GenerateColorParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

export function generateAntColors(color: string, mode: ThemeMode) {
  return generate(color, { theme: mode === 'dark' ? 'dark' : 'default' });
}

export function getThemeColors(color?: string, theme?: ThemeMode) {
  const tc = color || primaryColor,
    tm = theme || themeMode,
    colors = generateAntColors(tc, tm),
    primary = colors[5],
    modeColors = generateAntColors(primary, tm === 'dark' ? 'light' : 'dark');
  return [...colors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorParams) {
  const arr = new Array(19).fill(0),
    lightens = arr.map((_t, i) => mixLighten(color, i / 5)),
    darkens = arr.map((_t, i) => mixDarken(color, i / 5)),
    alphaColors = arr.map((_t, i) =>
      tinycolor(color)
        .setAlpha(i / 20)
        .toRgbString()
    ),
    tinycolorLightens = arr
      .map((_t, i) =>
        tinycolor(color)
          .setAlpha(i * 5)
          .toHexString()
      )
      .filter((item) => item !== '#ffffff'),
    tinycolorDarkens = arr
      .map((_t, i) =>
        tinycolor(color)
          .setAlpha(i * 5)
          .toHexString()
      )
      .filter((item) => item !== '#000000');
  return [...lightens, ...darkens, ...alphaColors, ...tinycolorDarkens, ...tinycolorLightens];
}

export function generateModifyVars() {
  const palettes = generateAntColors(primaryColor, themeMode),
    primary = palettes[5],
    primaryColorObj: Record<string, string> = {};
  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  return {
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187',
    'error-color': '#ED6F6F',
    'warning-color': '#EFBD47',
    'disabled-color': 'rgba(0, 0, 0, 0.25)',
    'heading-color': 'rgba(0, 0, 0, 0.85)',
    'text-color': 'rgba(0, 0, 0, 0.85)',
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
    'font-size-base': '14px',
    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
    'border-color-base': '#d9d9d9',
    'border-radius-base': '2px',
    'link-color': primary,
  };
}
