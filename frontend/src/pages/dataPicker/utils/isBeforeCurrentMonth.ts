import dayjs from 'dayjs';

export const isBeforeCurrentMonth = (date: dayjs.Dayjs): boolean => {
  return date.isBefore(dayjs(), 'month');
};
