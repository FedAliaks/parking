import dayjs from 'dayjs';
import { setDayColor } from './setDayColor';


export interface CalendarDayData {
  key: number;
  day: number | null;
  bgColor: string;
}

export const setCalendarData = (
  year: number,
  month: number,
  monthlyReservation: number[],
): CalendarDayData[] => {
  const calendarCells: (number | null)[] = [];

  const startDayOfWeek = dayjs(`${year}-${month + 1}-01`).day() || 7;
  const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();

  for (let i = 1; i < startDayOfWeek; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const calendarData = calendarCells.map((day, index) => {
    const dayIndex = day ? day - 1 : null;
    const reservationsCount = dayIndex !== null ? monthlyReservation[dayIndex] : null;
    const bgColor = setDayColor(reservationsCount);

    return {
      key: index,
      day,
      bgColor,
    };
  });

  return calendarData;
};
