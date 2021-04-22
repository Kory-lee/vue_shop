import { generate } from '@ant-design/colors';

export const primaryColor = '#0960bd';

export const themeMode = 'light';

type Fn = (...arg: any) => any;

export interface GenerateColorParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

export function generateAntColors(color: string) {
  return generate(color, { theme: 'default' });
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor,
    colors = generateAntColors(tc),
    primary = colors[5],
    modeColors = generateAntColors(primary);
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
    darkens = arr.map((_t, i) => mixDarken(color, i / 5));

  const alphaColors = arr.map((_t, i) =>
      tinycolor(color)
        .setAlpha(i / 20)
        .toRgbString()
    ),
    shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.')),
    tinycolorLightens = arr
      .map((_t, i) =>
        tinycolor(color)
          .lighten(i * 5)
          .toHexString()
      )
      .filter((item) => item !== '#ffffff'),
    tinycolorDarkens = arr
      .map((_t, i) =>
        tinycolor(color)
          .darken(i * 5)
          .toHexString()
      )
      .filter((item) => item !== '#000000');

  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}
