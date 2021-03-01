export enum sizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

export enum screenEnum {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}
export const screenMap = new Map<sizeEnum, number>()
  .set(sizeEnum.XS, screenEnum.XS)
  .set(sizeEnum.SM, screenEnum.SM)
  .set(sizeEnum.MD, screenEnum.MD)
  .set(sizeEnum.LG, screenEnum.LG)
  .set(sizeEnum.XL, screenEnum.XL)
  .set(sizeEnum.XXL, screenEnum.XXL);
