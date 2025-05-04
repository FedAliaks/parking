import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { COLORS } from '../../../constants';
import { TSetCalendarData } from './types';

export const createCalendarCells = (
  handleDayClick: (day: number) => void,
  calendarData: TSetCalendarData[],
  currentDate: dayjs.Dayjs,
): React.ReactElement[] => {
  return calendarData.map(({ key, day, bgColor }) => {
    const selectedDate = day
      ? dayjs().year(currentDate.year()).month(currentDate.month()).date(day)
      : null;

    const isPastDate = selectedDate ? selectedDate.isBefore(dayjs(), 'day') : false;

    const handleBoxClick = () => {
      if (day && !isPastDate) {
        handleDayClick(day);
      }
    };

    const backgroundColor = day ? (isPastDate ? COLORS.additionalColor : bgColor) : 'transparent';

    const cursor = day ? (isPastDate ? 'auto' : 'pointer') : 'auto';

    return (
      <Box
        key={key}
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleBoxClick}
        sx={{
          border: `2px solid ${COLORS.lightColor}`,
          borderRadius: 2,
          backgroundColor,
          cursor,
        }}
      >
        {day && <span>{day}</span>}
      </Box>
    );
  });
};
