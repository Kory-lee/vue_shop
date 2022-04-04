import dayjs from 'dayjs';

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:MM';
export const YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = YYYY_MM_DD_HH_MM
) {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
