import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { daysOfWeek } from './constants';
import { COLORS } from '../../constants';
import {
  StyledBox,
  StyledFlexBox,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';

dayjs.locale('en');

const getMockAvailability = (year: number, month: number) => {
  const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
  const availability: Record<number, boolean> = {};
  for (let day = 1; day <= daysInMonth; day++) {
    availability[day] = Math.random() > 0.7;
  }
  return availability;
};

export const DataPickerPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const year = currentDate.year();
  const month = currentDate.month();
  const startDayOfWeek = dayjs(`${year}-${month + 1}-01`).day() || 7;
  const daysInMonth = currentDate.daysInMonth();
  const availability = getMockAvailability(year, month);

  const calendarCells: (number | null)[] = [];

  for (let i = 1; i < startDayOfWeek; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <StyledBox>
      <StyledTitle>PARKING PRO Reservation</StyledTitle>
      <StyledFlexBox flexDirection="row">
        <StyledSubtitle>Place A-02</StyledSubtitle>
        <StyledTypography>Street 1</StyledTypography>
      </StyledFlexBox>

      <StyledFlexBox flexDirection="row">
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIosNewIcon sx={{ color: COLORS.primaryColor }} />
        </IconButton>
        <StyledSubtitle>{currentDate.format('MMMM YYYY').toUpperCase()}</StyledSubtitle>

        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon sx={{ color: COLORS.primaryColor }} />
        </IconButton>
      </StyledFlexBox>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" mb={1}>
        {daysOfWeek.map(day => (
          <Box key={day} textAlign="center" fontWeight="medium">
            {day}
          </Box>
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={0.5}>
        {calendarCells.map((day, idx) => (
          <Box
            key={idx}
            height={40}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ border: `2px solid ${COLORS.lightColor}`, borderRadius: 2 }}
          >
            {day === null ? (
              ''
            ) : availability[day] ? (
              <CheckCircleIcon fontSize="small" color="success" />
            ) : (
              <CancelIcon fontSize="small" color="error" />
            )}
          </Box>
        ))}
      </Box>
    </StyledBox>
  );
};
