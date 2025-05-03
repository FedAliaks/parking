import dayjs from 'dayjs';
import { TReservationSlotsResponse } from '../types';

export const getMonthlyReservationArray = (
  reservations: TReservationSlotsResponse[],
  year: number,
  month: number,
): number[] => {
  const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
  const result = new Array(daysInMonth).fill(0);

  for (const res of reservations) {
    const date = dayjs(res.reserved_date);
    if (date.year() === year && date.month() === month) {
      const dayIndex = date.date() - 1;
      result[dayIndex]++;
    }
  }

  return result;
};
