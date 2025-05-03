import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { daysOfWeek } from './constants';
import { COLORS, ParkingSlotIdStorage } from '../../constants';
import {
  StyledBox,
  StyledFlexBox,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';
import { TReservationSlotsResponse, TSlotsParametersResponse } from './types';
import { getAllReservationBySlotsId, getMonthlyReservationArray, getParkingSlotById, isBeforeCurrentMonth, setCalendarData } from './utils';



export const DataPickerPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservedSlots, setReservedSlots] = useState<TReservationSlotsResponse[]>([]);
  const [currentSlot, setCurrentSlot] = useState<TSlotsParametersResponse | null>(null);
  const [monthlyReservation, setMonthlyReservation] = useState<number[]>([]);

  const parkingSlotID = localStorage.getItem(ParkingSlotIdStorage) || '';
  const calendarCells: (number | null)[] = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservations, currentSlot] = await Promise.all([
          getAllReservationBySlotsId(parkingSlotID),
          getParkingSlotById(parkingSlotID),
        ]);

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

  const handlePrevMonth = () => {
    const prevMonth = currentDate.subtract(1, 'month');

    if (!isBeforeCurrentMonth(prevMonth)) {
      setCurrentDate(prevMonth);
    }
  };

  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  useEffect(() => {
    const year = currentDate.year();
    const month = currentDate.month();
    const reservationArr = getMonthlyReservationArray(reservedSlots, year, month);
    console.log(reservationArr);
    setMonthlyReservation(reservationArr);
  }, [currentDate, reservedSlots]);

  const year = currentDate.year();
  const month = currentDate.month();


  console.log(calendarCells);
  console.log(monthlyReservation);

  const calendarData = setCalendarData(year, month, monthlyReservation)

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
        {calendarData.map(({ key, day, bgColor }) => (
          <Box
            key={key}
            height={40}
            width={40}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              border: `2px solid ${COLORS.lightColor}`,
              borderRadius: 2,
              backgroundColor: day ? bgColor : 'transparent',
            }}
          >
            {day && <span>{day}</span>}
          </Box>
        ))}
      </Box>
    </StyledBox>
  );
};
