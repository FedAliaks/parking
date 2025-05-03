import { COLORS, countHoursInDay } from '../../../constants';

export const setDayColor = (count: number | null): string => {
  if (count === 0) return COLORS.emptyReservedColor;
  if (count !== null && count < countHoursInDay) return COLORS.partReservedColor;
  if (count === countHoursInDay) return COLORS.fullReservedColor;
  return 'transparent';
};
