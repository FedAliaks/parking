import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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
import { getAllReservationBySlotsId } from './utils/getAllReservationBySlotsId';
import { TReservationSlotsResponse, TSlotsParametersResponse } from './types';
import { getParkingSlotById } from './utils/getParkingSlotById';

dayjs.locale('en');

export const DataPickerPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reservetedSlots, setReservedSlots] = useState<TReservationSlotsResponse[]>([]);
  const [currentSlot, setCurrentSlot] = useState<TSlotsParametersResponse | null>(null);

  const parkingSlotID = localStorage.getItem(ParkingSlotIdStorage) || '';

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

  const getMockAvailability = (year: number, month: number) => {
    const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    const availability: Record<number, boolean> = {};
    for (let day = 1; day <= daysInMonth; day++) {
      availability[day] = Math.random() > 0.7;
    }
    return availability;
  };

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
