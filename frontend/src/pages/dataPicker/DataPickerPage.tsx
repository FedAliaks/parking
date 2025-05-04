import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { daysOfWeek } from './constants';
import { TReservationSlotsResponse, TSlotsParametersResponse } from './types';
import {
  createCalendarCells,
  getAllReservationBySlotsId,
  getMonthlyReservationArray,
  getParkingSlotById,
  isBeforeCurrentMonth,
  setCalendarData,
} from './utils';
import { useNavigate } from 'react-router-dom';
import { COLORS, ParkingSlotIdStorage } from '@/constants';
import { AppRoutes } from '@/routes/path';
import {
  StyledBox,
  StyledButton,
  StyledFlexBox,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '@/components/ui';

export const DataPickerPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservedSlots, setReservedSlots] = useState<TReservationSlotsResponse[]>([]);
  const [currentSlot, setCurrentSlot] = useState<TSlotsParametersResponse | null>(null);
  const [monthlyReservation, setMonthlyReservation] = useState<number[]>([]);

  const parkingSlotID = localStorage.getItem(ParkingSlotIdStorage) || '';
  const year = currentDate.year();
  const month = currentDate.month();
  const calendarData = setCalendarData(year, month, monthlyReservation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservations, currentSlot] = await Promise.all([
          getAllReservationBySlotsId(parkingSlotID),
          getParkingSlotById(parkingSlotID),
        ]);
        console.log('reservation');
        console.log(reservations);

        setReservedSlots(reservations);
        setCurrentSlot(currentSlot);
      } catch (error) {
        console.error('Error in request:', error);
      }
    };

    if (parkingSlotID) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const reservationArr = getMonthlyReservationArray(reservedSlots, year, month);
    setMonthlyReservation(reservationArr);
  }, [currentDate, reservedSlots]);

  const handlePrevMonth = () => {
    const prevMonth = currentDate.subtract(1, 'month');

    if (!isBeforeCurrentMonth(prevMonth)) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const handleDayClick = (day: number) => {
    const selectedDate = dayjs().year(currentDate.year()).month(currentDate.month()).date(day);
    const date = selectedDate.format('YYYY-MM-DD');
    navigate(`${AppRoutes.SLOTS}?date=${date}`);
  };

  const handleGoToTheChoosePlaceClick = () => {
    navigate(AppRoutes.PARKING);
  };

  const handleGoToMyReservation = () => {
    navigate(AppRoutes.MY_RESERVATION);
  };

  return (
    <StyledBox>
      <StyledTitle>PARKING PRO Reservation</StyledTitle>
      <StyledFlexBox flexDirection="row">
        <StyledSubtitle>{`Place: ${currentSlot?.name}`}</StyledSubtitle>
        <StyledTypography>{`Place: ${currentSlot?.location}`}</StyledTypography>
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
        {createCalendarCells(handleDayClick, calendarData, currentDate)}
      </Box>
      <StyledButton onClick={handleGoToTheChoosePlaceClick}>Go to choose place page</StyledButton>
      <StyledButton onClick={handleGoToMyReservation}>Go to my reservations</StyledButton>
    </StyledBox>
  );
};
