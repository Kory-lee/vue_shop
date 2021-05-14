import moment from 'moment';

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:MM';

export function formatToDateTime(date: moment.MomentInput = null, format = YYYY_MM_DD_HH_MM) {
  return moment(date).format(format);
}
